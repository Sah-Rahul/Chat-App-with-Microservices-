import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.router";
import cookieParser from "cookie-parser";

dotenv.config();

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB()

app.use('/api/auth', authRoutes)

app.get("/", (req, res) => {
  res.send("Auth Service is working (TS Version)");
});