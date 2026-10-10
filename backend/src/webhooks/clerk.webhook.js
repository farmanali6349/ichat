import express from "express";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { CLERK_WEBHOOK_SIGNING_SECRET } from "../config/config.js";
import { db } from "../db/db.js";
import { eq, sql } from "drizzle-orm";
import { userTable } from "../db/schema.js";

export const clerkWebhook = express.Router();

async function createUser(data) {
  const [user] = await db
    .insert(userTable)
    .values({ ...data })
    .returning();
  return user;
}

async function updateUser(data) {
  const [user] = await db
    .update(userTable)
    .set({ ...data })
    .where(eq(userTable.clerkId, data.clerkId))
    .returning();

  return user;
}

async function deleteUser(clerkId) {
  await db.delete(userTable).where(eq(userTable.clerkId, clerkId));
  return true;
}

clerkWebhook.post("/", async (req, res) => {
  const signingSecret = CLERK_WEBHOOK_SIGNING_SECRET;

  if (!signingSecret) {
    return res.status(503).json({ message: "Webhook Secret is not provided" });
  }

  const payload = Buffer.isBuffer(req.body)
    ? req.body.toString("utf8")
    : String(req.body);

  const request = new Request("https://internal/webhooks/clerk", {
    method: "POST",
    headers: new Headers(req.headers),
    body: payload,
  });

  let evt;

  try {
    evt = await verifyWebhook(request, { signingSecret });
  } catch (error) {
    console.log("Invalid Clerk webhook signature :: ", error);
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid webhook signature",
    });
  }

  if (
    evt.type !== "user.created" &&
    evt.type !== "user.updated" &&
    evt.type !== "user.deleted"
  ) {
    return res.status(200).json({ success: true });
  }

  try {
    const u = evt.data;

    if (evt.type === "user.deleted") {
      await deleteUser(u.id);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
      });
    }

    const email =
      u.email_addresses?.find((e) => e.id === u.primary_email_address_id)
        ?.email_address ?? u.email_addresses?.[0]?.email_address;

    if (!email) {
      throw new Error("No email found in Clerk user data");
    }

    const fullName =
      [u.first_name, u.last_name].filter(Boolean).join(" ") ||
      email.split("@")[0] ||
      "Clerk User";

    const data = {
      clerkId: u.id,
      fullName,
      email,
      username: u.username ?? email.split("@")[0],
      profilePic: u.has_image ? u.image_url : null,
    };

    if (evt.type === "user.created") {
      const user = await createUser(data);

      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User created successfully",
        data: { id: user.id, clerkId: user.clerkId },
      });
    }

    if (evt.type === "user.updated") {
      const user = await updateUser({ ...data, updatedAt: sql`now()` });

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: { id: user.id, clerkId: user.clerkId, updatedAt: user.updatedAt },
      });
    }
  } catch (error) {
    console.log("Error in the Clerk Webhook :: ", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error processing webhook request " + error?.message,
    });
  }
});
