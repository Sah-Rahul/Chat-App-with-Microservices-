import { QUEUES } from "../config/queues";
import { getRabbitChannel } from "../config/rabbitmq";
import { sendEmail } from "../emailTemplates/sendEmail";
import { verifyEmail } from "../emailTemplates/verifyEmail";
import { consumeQueue } from "../utils/rabbitmq.utils";


const MAX_RETRIES = 3;

const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.CLIENT}/verify-email?token=${token}`;

  await sendEmail({
    email,
    subject: "Verify your email – Educate LMS",
    html: verifyEmail(verificationUrl),
  });
};

consumeQueue(QUEUES.EMAIL_VERIFICATION, async (msg) => {
  if (!msg) return;

  const channel = getRabbitChannel();

  try {
    const data = JSON.parse(msg.content.toString());
    const { email, token, retries = 0 } = data;

    await sendVerificationEmail(email, token);

    channel.ack(msg);
  } catch (error: any) {
    console.error("❌ Error processing message:", error.message);

    try {
      const data = JSON.parse(msg.content.toString());
      const { email, token, retries = 0 } = data;

      if (retries < MAX_RETRIES) {
        console.log(`Retrying... Attempt ${retries + 1}`);

        channel.sendToQueue(
          QUEUES.EMAIL_VERIFICATION,
          Buffer.from(
            JSON.stringify({
              email,
              token,
              retries: retries + 1,
            }),
          ),
          { persistent: true },
        );

        channel.ack(msg);
      } else {
        console.log("❌ Max retries reached. Sending to DLQ...");
        channel.nack(msg, false, false);
      }
    } catch {
      console.log("❌ Invalid message format. Sending to DLQ...");
      channel.nack(msg, false, false);
    }
  }
});
