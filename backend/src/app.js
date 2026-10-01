import "dotenv/config";
import express from "express";

export const app = express();

// Confirmation Route
app.get("/", (req, res) =>
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: `Server running fine`,
  }),
);
