import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`index: connected`, socket.id);
  socket.on("joinRoom", (id) => {
    console.log(`sockets: joined`, id);
    socket.join(id);
  });
  socket.on("leaveRoom", (id) => {
    console.log(`sockets: left`, id);
    socket.leave(id);
  });
  socket.on("disconnect", () => {
    console.log(`index: disconnected`, socket.id);
  });
});

export { app, io, server };
