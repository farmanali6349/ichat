import { desc, eq, or, sql } from "drizzle-orm";
import { db } from "../db/db.js";
import { messageTable, userTable } from "../db/schema.js";

export const getAllConversations = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthenticated User",
    });
  }

  try {
    const peer = sql`
    case
    when ${messageTable.senderId} = ${userId}
    then ${messageTable.receiverId}
    else ${messageTable.senderId}
    end
  `;

    const latestPerPerson = db
      .selectDistinctOn([peer], {
        peerId: peer.as("peerId"),
        username: userTable.username,
        fullname: userTable.fullName,
        profilePic: userTable.profilePic,
        lastMessageId: messageTable.id,
        lastMessageText: messageTable.text,
        lastMessageImage: messageTable.image,
        lastMessageVideo: messageTable.video,
        lastMessageAt: messageTable.createdAt,
      })
      .from(messageTable)
      .innerJoin(userTable, eq(userTable.id, peer))
      .where(
        or(
          eq(messageTable.senderId, userId),
          eq(messageTable.receiverId, userId),
        ),
      )
      .orderBy(peer, desc(messageTable.createdAt), desc(messageTable.id))
      .as("latest_as_person");

    const conversations = await db
      .select()
      .from(latestPerPerson)
      .orderBy(
        desc(latestPerPerson.lastMessageAt),
        desc(latestPerPerson.lastMessageId),
      );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Conversations retrieved successfully",
      data: conversations,
    });
  } catch (error) {
    console.log("Error occured while retrieving the conversations");

    return res.status(500).json({
      success: false,
      statusCode: 401,
      message: "Error occured while retrieving the conversations",
    });
  }
};
