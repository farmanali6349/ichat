import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { FRONTEND_URL } from "./config/config.js";
import fs from "fs";
import path from "path";

import { clerkWebhook } from "./webhooks/clerk.webhook.js";
import { authRouter } from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
export const app = express();

app.use(
  "/api/webhook/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook,
);
// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use("/api/auth", authRouter);

const publicDir = path.join(process.cwd(), "public");

// Confirmation Route
app.get("/health", (req, res) =>
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: `Server running fine`,
  }),
);

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

// Global error handler (must be last)
app.use(errorHandler);
