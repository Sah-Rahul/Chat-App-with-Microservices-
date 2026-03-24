import winston from "winston";
import config from "./index";

const logger = winston.createlogger({
  level: config.node_env === "production" ? "info" : "dubug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),

  defaultMeta: { service: "api_monitoring" },

  transport: [
    new winston.transport.file({ filename: "logs/error.js", level: "error" }),
    new winston.transport.file({ filename: "logs/combined.log" }),
  ],
});

if (config.node_env !== "production") {
  logger.add(
    new winston.transport.Console({
      format: winston.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

export default logger;
