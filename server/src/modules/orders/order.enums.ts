export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FAILED = "failed",
}

export enum OrderType {
  COURSE_PURCHASE = "course_purchase",
  INSTITUTE_ADMISSION = "institute_admission",
  BUNDLE_PURCHASE = "bundle_purchase",
}
