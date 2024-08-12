import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (url: string = "http://localhost:3000"): Socket => {
  if (!socket) {
    socket = io(url);

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const closeSocket = (): void => {
  if (socket) {
    socket.close();
    socket = null;
  }
};