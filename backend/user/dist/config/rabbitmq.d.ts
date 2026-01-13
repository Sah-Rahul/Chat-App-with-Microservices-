import amqp from "amqplib";
export declare const connectRabbitMQ: () => Promise<amqp.Channel | void>;
export declare const publishToQueue: (queueName: string, message: any) => Promise<void>;
//# sourceMappingURL=rabbitmq.d.ts.map