import { Server, Socket } from "socket.io";

export const setupSocketConnection = (express_server) => {
  let usersOnline: string[] = [];
  const date = new Date();

  const io = new Server(express_server, {
    cors: {
      origin: "*",
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    usersOnline = [...usersOnline, socket.id];

    console.log("Users online", usersOnline);

    // Join a room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit(
        "receive_message",
        JSON.stringify({
          message: `${socket.id} has joined`,
          sender: "Room Log",
          time: `${date.getHours()}:${date.getMinutes()}`,
        })
      );
    });

    socket.on("send_message", (data) => {
      const json_data = JSON.parse(data);

      io.to(json_data.chatroomId).emit(
        "receive_message",
        JSON.stringify({
          message: json_data.message,
          sender: socket.id,
          time: json_data.time,
        })
      );
    });

    // Add this new event handler
    socket.on("leave_room", (roomId) => {
      socket.leave(roomId);
      io.to(roomId).emit(
        "receive_message",
        JSON.stringify({
          message: `${socket.id} has left`,
          sender: "Room Log",
          time: `${date.getHours()}:${date.getMinutes()}`,
        })
      );
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      usersOnline = usersOnline.filter((user) => user != socket.id);

      console.log("Users online", usersOnline);
    });
  });
};
