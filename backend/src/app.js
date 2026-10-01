import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { FRONTEND_URL } from "./config/config.js";

export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware);

// Confirmation Route
app.get("/", (req, res) =>
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: `Server running fine`,
  }),
);
