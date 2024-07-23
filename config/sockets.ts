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
  if (socket.handshake.query.businessId) {
    console.log(`index: joined room `, socket.handshake.query.businessId);
    socket.join(socket.handshake.query.businessId);
  } else {
    console.log(`index: no businessId provided`);
    socket.disconnect();
  }
  socket.on("disconnect", () => {
    console.log(`index: disconnected`, socket.id);
  });
});

export { app, io, server };
