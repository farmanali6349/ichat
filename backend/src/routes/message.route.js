import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getAllConversations } from "../controllers/message.controller.js";
export const messageRouter = express.Router();

messageRouter.get("/conversations", isAuthenticated, getAllConversations);
messageRouter.get("/messages/:otherUserId", isAuthenticated, g);
