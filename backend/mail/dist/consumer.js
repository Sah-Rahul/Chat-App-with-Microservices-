import amqp from "amqplib";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
export const startOtpConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST || "localhost",
            port: 5672,
            username: process.env.RABBITMQ_USER || "guest",
            password: process.env.RABBITMQ_PASS || "guest",
        });
        const channel = await connection.createChannel();
        const queueName = "send_otp";
        await channel.assertQueue(queueName, { durable: true });
        console.log("✅ Mail consumer started, listening for OTP emails...");
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "585"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        channel.consume(queueName, async (msg) => {
            if (!msg)
                return;
            try {
                const { to, subject, body } = JSON.parse(msg.content.toString());
                await transporter.sendMail({
                    from: process.env.SMTP_FROM || '"OTP Service" <no-reply@example.com>',
                    to,
                    subject,
                    text: body,
                });
                console.log(`✅ OTP email sent to: ${to}`);
                channel.ack(msg);
            }
            catch (error) {
                console.error("❌ Failed to send OTP email:", error);
                channel.nack(msg, false, false);
            }
        });
    }
    catch (error) {
        console.error("❌ RabbitMQ  Mail consumer failed:", error);
    }
};
//# sourceMappingURL=consumer.js.map