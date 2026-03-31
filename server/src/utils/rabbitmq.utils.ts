import * as amqp from "amqplib";
import { getRabbitChannel } from "../config/rabbitmq";

export const sendToQueue = async (
  queueName: string,
  data: any,
): Promise<void> => {
  try {
    const channel = getRabbitChannel();

    const messageBuffer = Buffer.from(JSON.stringify(data));

    await channel.sendToQueue(queueName, messageBuffer, {
      persistent: true, // 🔥 important for durability
    });

    console.log(`📩 Message sent to ${queueName}`);
  } catch (error: any) {
    console.error("❌ Error sending message to queue:", error.message);
    throw error;
  }
};

export const consumeQueue = async (
  queueName: string,
  callback: (msg: amqp.ConsumeMessage | null) => void,
) => {
  const channel = getRabbitChannel();

  await channel.consume(queueName, callback, {
    noAck: false,
  });
};
