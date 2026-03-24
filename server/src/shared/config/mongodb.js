import mongoose from "mongoose";
import config from "./index";
import logger from "./logger";

class MongoConnection {
  constructor() {
    this.connection = null;
  }

  // Connect to MongoDB
  async connect() {
    try {
      if (this.connection) {
        logger.info("MongoDB already connected");
        return this.connection;
      }

      const db = await mongoose.connect(config.mongo.uri, {
        dbName: config.mongo.dbName,
      });

      this.connection = mongoose.connection;

      logger.info(`MongoDB connected: ${config.mongo.uri}`);

      this.connection.on("error", (err) => {
        logger.error("MongoDB connection error:", err);
      });

      this.connection.on("disconnected", () => {
        logger.warn("MongoDB disconnected");
      });

      return this.connection;
    } catch (error) {
      logger.error("MongoDB connection failed:", error);
      process.exit(1);
    }
  }

  // Disconnect from MongoDB
  async disconnect() {
    try {
      if (!this.connection) {
        logger.warn("No MongoDB connection to close");
        return;
      }

      await mongoose.disconnect();
      this.connection = null;

      logger.info("MongoDB disconnected successfully");
    } catch (error) {
      logger.error("Error while disconnecting MongoDB:", error);
    }
  }
}

export default new MongoConnection();
