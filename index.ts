import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.ts";
import { verifyToken } from "./middleware/auth.middleware.ts";
import authRoutes from "./routes/auth.routes.ts";
import businessRoutes from "./routes/business.routes.ts";
import reviewRoutes from "./routes/review.routes.ts";
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function main() {
  await connectDB();

  app.use(express.json());
  app.use(cors());

  app.use("/api/auth", authRoutes);
  app.use("/api/business", businessRoutes);
  app.use("/api/review", verifyToken, reviewRoutes);

  io.on("connection", (socket) => {
    console.log(`index: connected`, socket.id);
    if (socket.handshake.query.businessId) {
      console.log(`index: joined room `, socket.handshake.query.businessId);
      socket.join(socket.handshake.query.businessId);
    } else {
      console.log(`index: no businessId provided`);
      socket.disconnect();
    }
  });

  app.set("io", io);

  server.listen(PORT, () => {
    console.log(`index: Server listening on`, PORT);
  });
}

main();
