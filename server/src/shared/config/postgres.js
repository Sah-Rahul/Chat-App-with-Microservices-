import pkg from "pg";
const { Pool } = pkg;

import config from "./index";
import logger from "./logger";

class PostgresConnection {
  constructor() {
    this.pool = null;
  }

  getPool() {
    if (!this.pool) {
      this.pool = new Pool({
        host: config.postgres.host,
        port: config.postgres.port,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.dbName,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 20000,
      });

      this.pool.on("error", (err) => {
        logger.error("Unexpected error on idle PG client", err);
      });

      logger.info("PG Pool Created");
    }

    return this.pool;
  }

  async testConnection() {
    try {
      const pool = this.getPool();

      const client = await pool.connect();

      const result = await client.query("SELECT NOW()");

      client.release();

      logger.info(`PG connected successfully at ${result.rows[0].now}`);
    } catch (error) {
      logger.error("Failed to connect to PG", error);
      throw error;
    }
  }

  async query(text, params) {
    const pool = this.getPool();
    const start = Date.now();

    try {
      const result = await pool.query(text, params);

      const duration = Date.now() - start;

      logger.debug("Executed query", {
        text,
        duration,
        rows: result.rowCount,
      });

      return result;
    } catch (error) {
      logger.error("PostgreSQL query error:", error);
      throw error;
    }
  }

  async closeConnection() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;

      logger.info("PG pool closed");
    }
  }
}

export default new PostgresConnection();
