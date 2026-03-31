export enum NotificationType {
  COURSE_PURCHASE = "course_purchase",
  COURSE_UPDATE = "course_update",
  ENROLLMENT_SUCCESS = "enrollment_success",
  CERTIFICATE_GENERATED = "certificate_generated",
  INSTITUTE_APPROVED = "institute_approved",
  INSTITUTE_REJECTED = "institute_rejected",
  ADMISSION_APPROVED = "admission_approved",
  ADMISSION_REJECTED = "admission_rejected",
  INSTRUCTOR_APPROVED = "instructor_approved",
  INSTRUCTOR_REJECTED = "instructor_rejected",
  NEW_MESSAGE = "new_message",
  COURSE_REMINDER = "course_reminder",
  PAYMENT_SUCCESS = "payment_success",
  PAYMENT_FAILED = "payment_failed",
  REFUND_PROCESSED = "refund_processed",
  REVIEW_REPLY = "review_reply",
  DISCUSSION_REPLY = "discussion_reply",
  ANNOUNCEMENT = "announcement",
  SYSTEM_UPDATE = "system_update",
  ACCOUNT_SECURITY = "account_security",
}

export enum NotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum NotificationPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}
