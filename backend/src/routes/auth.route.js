import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { checkUser } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

// /api/auth/check

authRouter.get("/check", isAuthenticated, checkUser);
