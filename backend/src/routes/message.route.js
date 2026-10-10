import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import {
  getAllConversations,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
export const messageRouter = express.Router();

messageRouter.use(isAuthenticated);
messageRouter.get("/get-all-conversations", getAllConversations);
messageRouter.get("/:otherUserId/messages", getMessages);
messageRouter.post("/:receiverId/", upload.single("media"), sendMessage);
