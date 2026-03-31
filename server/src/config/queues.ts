export const QUEUES = {
  WELCOME: "welcomeQueue",
  EMAIL_VERIFICATION: "emailVerificationQueue",
  NOTIFICATIONS: "notificationsQueue",
} as const;

export const DLX_EXCHANGE = "dlx.exchange";
export const DLQ = "deadLetterQueue";
export const DLX_ROUTING_KEY = "dlx.routing";