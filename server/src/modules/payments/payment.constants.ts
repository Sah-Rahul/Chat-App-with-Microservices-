export const PAYMENT_CONSTANTS = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 1000000,
  WEBHOOK_TIMEOUT: 30000, // 30 seconds
  REFUND_PROCESSING_TIME: 5 * 24 * 60 * 60 * 1000, // 5 days
  PAYMENT_EXPIRY_TIME: 15 * 60 * 1000, // 15 minutes
};

export const PAYMENT_MESSAGES = {
  INITIATED: "Payment initiated successfully",
  SUCCESS: "Payment successful",
  FAILED: "Payment failed",
  REFUNDED: "Payment refunded successfully",
  CANCELLED: "Payment cancelled",
  NOT_FOUND: "Payment not found",
  ALREADY_PROCESSED: "Payment already processed",
  INVALID_SIGNATURE: "Invalid payment signature",
  WEBHOOK_RECEIVED: "Payment webhook received",
};

export const RAZORPAY_CONFIG = {
  KEY_ID: process.env.RAZORPAY_KEY_ID || "",
  KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "",
  WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || "",
};
