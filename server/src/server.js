import express from "express";
import cors from "cors"; 
import helmet from "helmet";
import cookieParser from "cookie-parser"

import logger from "./shared/config/logger.js";
import mongodb from "./shared/config/mongodb.js";
import postgres from "./shared/config/postgres.js";
import rabbitmq from "./shared/config/rabbitmq.js";
import config from "./shared/config/index.js";

import errorHandler from "./shared/middlewares/errorHandler.js"; 
import authRouter from "./services/auth/routes/authRoutes.js";
import clienRoutes from "./services/client/routes/clientRoutes.js";

const app = express();

app.use(helmet());
app.use(cors(
  {
    origin: true,
    credentials: true
  }
));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

 
app.get("/", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/v1/auth", authRouter)
app.use("/api", clienRoutes)


app.use(errorHandler);

 
async function initializeConnection() {
  try {
    logger.info("Initializing database connections...");

    await mongodb.connect();
    await postgres.testConnection();
    await rabbitmq.connect();

    logger.info("All connections established successfully");
  } catch (error) {
    logger.error("Failed to initialize connections:", error);
    throw error;
  }
}

 
async function startServer() {
  let isShuttingDown = false;

  try {
    await initializeConnection();

    const server = app.listen(config.port, () => {
      logger.info(`Server started on port ${config.port}`);
      logger.info(`Environment: ${config.node_env}`);
      logger.info(`API available at: http://localhost:${config.port}`);
    });

  
    const gracefulShutdown = async (signal) => {
      if (isShuttingDown) return;
      isShuttingDown = true;

      logger.info(`${signal} received, shutting down gracefully...`);

      server.close(async () => {
        logger.info("HTTP server closed");

        try {
          await mongodb.disconnect();
          await postgres.close();
          await rabbitmq.close();

          logger.info("All connections closed, exiting process");
          process.exit(0);
        } catch (error) {
          logger.error("Error during shutdown:", error);
          process.exit(1);
        }
      });

      // Force shutdown after 10s
      setTimeout(() => {
        logger.error("Forced shutdown");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown("unhandledRejection");
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
