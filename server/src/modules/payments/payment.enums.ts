export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  UPI = "upi",
  NET_BANKING = "net_banking",
  WALLET = "wallet",
  EMI = "emi",
}

export enum PaymentGateway {
  RAZORPAY = "razorpay",
  STRIPE = "stripe",
  PAYTM = "paytm",
  PHONEPE = "phonepe",
}
