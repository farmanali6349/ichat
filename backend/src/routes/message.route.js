import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getAllUsers } from "../controllers/message.controller.js";
export const messageRouter = express.Router();

messageRouter.get("/users", isAuthenticated, getAllUsers);
