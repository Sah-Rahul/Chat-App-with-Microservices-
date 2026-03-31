import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { helmetConfig } from "./config/helmet";
import { corsConfig } from "./config/cors";
import appRoutes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { globalRateLimiter } from "./middleware/rateLimiter.middleware";

const app = express();

app.use(helmet(helmetConfig));
app.use(cors(corsConfig));

app.use(globalRateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/v1",appRoutes);

app.use(errorMiddleware);

export default app;
