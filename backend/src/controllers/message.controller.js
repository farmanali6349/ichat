import { ne } from "drizzle-orm";
import { db } from "../db/db.js";
import { userTable } from "../db/schema.js";

export const getAllUsers = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, message: "Unauthorized" });
  }

  try {
    const users = await db
      .select({
        fullName: userTable.fullName,
        username: userTable.username,
        email: userTable.email,
        profilePic: userTable.profilePic,
      })
      .from(userTable)
      .where(ne(req.user.clerkId, userTable.clerkId));

    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.log("Error retrieving Users");
    throw error;
  }
};
