import * as amqp from "amqplib";
import { QUEUES, DLX_EXCHANGE, DLQ, DLX_ROUTING_KEY } from "./queues";

let connection: amqp.Connection;
let channel: amqp.Channel;

export const connectRabbitMQ = async (): Promise<void> => {
  const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  console.log("✅ RabbitMQ connected");
};

export const getRabbitChannel = (): amqp.Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};

export const setupQueues = async (): Promise<void> => {
  const channel = getRabbitChannel();

  await channel.assertExchange(DLX_EXCHANGE, "direct", {
    durable: true,
  });

  await channel.assertQueue(DLQ, {
    durable: true,
  });

  await channel.bindQueue(DLQ, DLX_EXCHANGE, DLX_ROUTING_KEY);

  for (const queueName of Object.values(QUEUES)) {
    await channel.assertQueue(queueName, {
      durable: true,
      arguments: {
        "x-dead-letter-exchange": DLX_EXCHANGE,
        "x-dead-letter-routing-key": DLX_ROUTING_KEY,
      },
    });
  }

  console.log("✅ All queues asserted properly");
};
