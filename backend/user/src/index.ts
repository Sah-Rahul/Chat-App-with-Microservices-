import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { createClient } from "redis";
import userRouter from "./routes/user.routes.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

export const ConnectRedis = createClient({
  url: process.env.REDIS_URL as string,
});

ConnectRedis.on("error", (err) => console.log("Redis Client Error", err));

await ConnectRedis.connect();
console.log("✅ Redis connected");

connectRabbitMQ();

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.use("api/v1", userRouter);
// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
