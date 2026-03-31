export const ORDER_CONSTANTS = {
  ORDER_PREFIX: "ORD",
  TAX_RATE: 14,  
  MIN_ORDER_VALUE: 1,
  MAX_ORDER_VALUE: 1000000,
  CANCELLATION_WINDOW: 24 * 60 * 60 * 1000, // 24 hours
  REFUND_PROCESSING_DAYS: 7,
};

export const ORDER_MESSAGES = {
  CREATED: "Order created successfully",
  UPDATED: "Order updated successfully",
  COMPLETED: "Order completed successfully",
  CANCELLED: "Order cancelled successfully",
  REFUNDED: "Order refunded successfully",
  NOT_FOUND: "Order not found",
  CANNOT_CANCEL: "Order cannot be cancelled at this stage",
  ALREADY_COMPLETED: "Order is already completed",
  PAYMENT_PENDING: "Payment is pending for this order",
};
