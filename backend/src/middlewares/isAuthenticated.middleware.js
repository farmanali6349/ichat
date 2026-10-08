import { getAuth } from "@clerk/express";
import { db } from "../db/db.js";
import { userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
export async function isAuthenticated(req, res, next) {
  try {
    let { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const res = await db
      .select()
      .from(userTable)
      .where(eq(userId, userTable.clerkId))
      .limit(1);

    const user = Array.isArray(res) ? res[0] : res;

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User is not synced yet",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error authenticating user :: ", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error authenticating user",
    });
  }
}
