export const PAYMENT_CONSTANTS = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 1000000,
  WEBHOOK_TIMEOUT: 30000,
  PAYMENT_EXPIRY_TIME: 15 * 60 * 1000,
};

export const PAYMENT_MESSAGES = {
  INITIATED: "Payment initiated successfully",
  SUCCESS: "Payment successful",
  FAILED: "Payment failed",
  CANCELLED: "Payment cancelled",
  NOT_FOUND: "Payment not found",
  ALREADY_PROCESSED: "Payment already processed",
  INVALID_SIGNATURE: "Invalid payment signature",
  WEBHOOK_RECEIVED: "Webhook received",
};

export const STRIPE_CONFIG = {
  SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
  PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
};