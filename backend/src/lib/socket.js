import express from "express";
import http from "http";
import { Server } from "socket.io";
import { FRONTEND_URL } from "../config/config.js";
export const app = express();
export const httpServer = http.createServer(app);
export const io = new Server(httpServer, { cors: { origin: [FRONTEND_URL] } });

const userSocketMap = new Map();

export const getReceiverSocketId = (userId) => {
  const socketId = userSocketMap.get(userId);

  if (!socketId || socketId === undefined) {
    return null;
  }

  return socketId;
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap.set(userId, socket.id);

  io.emit("getOnlineUsers", userSocketMap.keys());

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];

    io.emit("getOnlineUsers", userSocketMap.keys());
  });
});
