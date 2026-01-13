import amqp from "amqplib";
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST || "localhost",
            port: 5672,
            username: process.env.RABBITMQ_USER || "guest",
            password: process.env.RABBITMQ_PASS || "guest",
        });
        // Create channel
        channel = await connection.createChannel();
        // Declare a queue
        await channel.assertQueue("chat_queue", { durable: true });
        console.log("✅ RabbitMQ connected and channel created");
        connection.on("close", () => console.log("RabbitMQ connection closed"));
        connection.on("error", (err) => console.error("RabbitMQ connection error", err));
        return channel;
    }
    catch (error) {
        console.error("RabbitMQ connection failed", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("RabbitMQ channel is not initialized");
        return;
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
    console.log(`✅ Message sent to queue: ${queueName}`);
};
//# sourceMappingURL=rabbitmq.js.map