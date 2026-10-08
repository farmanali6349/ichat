import express from "express";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { CLERK_WEBHOOK_SIGNING_SECRET } from "../config/config.js";
import { db } from "../db/db.js";
import { eq, sql } from "drizzle-orm";
import { userTable } from "../db/schema.js";
export const clerkWebhook = express.Router();

async function createUser(data, res) {
  try {
    let [user] = await db
      .insert(userTable)
      .values({ ...data })
      .returning();

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: { id: user.id, clerkId: user.clerkId },
    });
  } catch (error) {
    console.log("Error creating user", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed creating user " + error?.message,
    });
  }
}
async function updateUser(data, res) {
  try {
    let [user] = await db
      .update(userTable)
      .set({ ...data })
      .where(eq(data.clerkId, userTable.clerkId))
      .returning();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: { id: user.id, clerkId: user.clerkId, updatedAt: user.updatedAt },
    });
  } catch (error) {
    console.log("Error updating user", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed updating user " + error?.message,
    });
  }
}
async function deleteUser(clerkId, res) {
  try {
    await db.delete(userTable).where(eq(clerkId, userTable.clerkId));
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting user ", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed deleting user " + error?.message,
    });
  }
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

  const evt = await verifyWebhook(request, { signingSecret });

  if (
    evt.type === "user.created" ||
    evt.type === "user.updated" ||
    evt.type === "user.deleted"
  ) {
    try {
      const u = evt.data;

      // Delete the user
      if (evt.type === "user.deleted") {
        try {
          deleteUser(u.id, res);
        } catch (error) {
          console.log("Error deleting user :: ", error);
          return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Error deleting user " + error,
          });
        }
      }

      const email =
        u.email_addresses?.find((e) => e.id === u.primary_email_address_id)
          .email_address ?? u.email_addresses[0].email_address;
      const fullName =
        [u.first_name, u.last_name].filter(Boolean).join(" ") ||
        email.split("@")[0] ||
        "Clerk User";

      const data = {
        clerkId: u.id,
        fullName,
        email,
        username: u.username,
        profilePic: u.has_image ? u.image_url : null,
      };

      if (evt.type === "user.created") {
        createUser(data, res);
      } else if (evt.type === "user.updated") {
        updateUser({ ...data, updatedAt: sql`now()` }, res);
      }
    } catch (error) {
      console.log("Error in the Clerk Webhook :: ", error);
      return res.status(400).json({
        success: false,
        statusCode: 500,
        message: "Error processing webhook request " + error?.message,
      });
    }
  }
});
