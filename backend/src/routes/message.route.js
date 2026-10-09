import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import {
  getAllConversations,
  getMessages,
} from "../controllers/message.controller.js";
export const messageRouter = express.Router();

messageRouter.get(
  "/get-all-conversations",
  isAuthenticated,
  getAllConversations,
);
messageRouter.get("/:otherUserId/messages", isAuthenticated, getMessages);
