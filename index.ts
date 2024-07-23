import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.ts";
import { app, server } from "./config/sockets.ts";
import { verifyToken } from "./middleware/auth.middleware.ts";
import authRoutes from "./routes/auth.routes.ts";
import businessRoutes from "./routes/business.routes.ts";
import reviewRoutes from "./routes/review.routes.ts";
import userRoutes from "./routes/user.routes.ts";
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();

  app.use(express.json());
  app.use(cors());

  app.use("/api/auth", authRoutes);
  app.use("/api/business", businessRoutes);
  app.use("/api/review", verifyToken, reviewRoutes);
  app.use("/api/user", verifyToken, userRoutes);

  server.listen(PORT, () => {
    console.log(`index: Server listening on`, PORT);
  });
}

main();
