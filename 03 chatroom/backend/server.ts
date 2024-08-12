import express from "express";
import messages_route from "./routes/messages";
import active_rooms from "./routes/active_rooms";
import room_availability from "./routes/room_availability";
import { setupSocketConnection as socket_setup } from "./socket/connection";

const app = express();
const PORT = process.env.PORT || 3000;

const express_server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
socket_setup(express_server);

//Routes
app.use("/api/messages", messages_route);
app.use("/api/rooms", active_rooms);
app.use("/api/room", room_availability);
