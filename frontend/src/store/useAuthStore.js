import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../lib/axios";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await axios.get(`/api/check`);

      set({ authUser: res.data.data });
    } catch (error) {
      console.log("Error checking the user data :: ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  clearAuth: () => {
    set({
      authUser: null,
      isCheckingAuth: false,
      onlineUsers: [],
      socket: null,
    });
  },
  connectSocket: (user) => {
    if (!user || get().socket?.connected) return;

    const socket = io(baseURL, { query: { userId: user.id } });
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket.connected) socket.disconnect();
    set({ socket: null });
  },
}));
