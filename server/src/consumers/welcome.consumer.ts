import { QUEUES } from "../config/queues";
import { getRabbitChannel } from "../config/rabbitmq";
import { sendWelcomeEmail } from "../services/sendWelcomeEmail.service";
import { consumeQueue } from "../utils/rabbitmq.utils";

consumeQueue(QUEUES.WELCOME, async (msg) => {
  if (!msg) return;

  const channel = getRabbitChannel();

  try {
    const { email, userName } = JSON.parse(msg.content.toString());

    await sendWelcomeEmail(email, userName);

    channel.ack(msg);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);

    channel.nack(msg, false, false);
  }
});