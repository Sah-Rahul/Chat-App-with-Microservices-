import amqp from "amqplib";
import config from "./index";
import logger from "./logger";

class RabbitmqConnection {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.isConnecting = false;
  }

  async connect() {
    if (this.channel) {
      return this.channel;
    }

    if (this.isConnecting) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!this.isConnecting) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

      return this.channel;
    }

    try {
      this.isConnecting = true;

      logger.info("Connecting to RabbitMQ", config.rabbitmq.url);

      this.connection = await amqp.connect(config.rabbitmq.url);
      this.channel = await this.connection.createChannel();

      const dlqName = `${config.rabbitmq.queue}.dlq`;

      // Dead Letter Queue
      await this.channel.assertQueue(dlqName, {
        durable: true,
      });

      // Main Queue
      await this.channel.assertQueue(config.rabbitmq.queue, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": "",
          "x-dead-letter-routing-key": dlqName,
        },
      });

      logger.info("RabbitMQ connected, queue:", config.rabbitmq.queue);

      // Handle close
      this.connection.on("close", () => {
        logger.warn("RabbitMQ connection closed");
        this.channel = null;
        this.connection = null;
      });

      // Handle error
      this.connection.on("error", (err) => {
        logger.error("RabbitMQ connection error", err);
        this.channel = null;
        this.connection = null;
      });

      return this.channel;
    } catch (error) {
      logger.error("RabbitMQ connection failed", error);
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  getChannel() {
    return this.channel;
  }

  getStatus(){
    if(!this.connect || !this.channel) return "disconnected"
    if(!this.connect || !this.channel) return "closing"
    return "connected"

  }

  async close(){
    try {
      if(this.channel){
        await this.channel.close()
        this.channel = null
      }


      if(this.connection){
        await this.connection.close()
        this.channel = null
      }

      logger.info("RabbitMq connection closed")
    } catch (error) {
      logger.info("Error in closing RabbitMq connection", error)
      
    }
  }
}

export default new RabbitmqConnection();
