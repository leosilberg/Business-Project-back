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
  socket.on("joinBusiness", (businessId) => {
    console.log(`sockets: joined`, businessId);
    socket.join(businessId);
  });
  socket.on("leaveBusiness", (businessId) => {
    console.log(`sockets: left`, businessId);
    socket.leave(businessId);
  });
  socket.on("disconnect", () => {
    console.log(`index: disconnected`, socket.id);
  });
});

export { app, io, server };
