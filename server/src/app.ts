import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // production me specific origin dena
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

export default app;
