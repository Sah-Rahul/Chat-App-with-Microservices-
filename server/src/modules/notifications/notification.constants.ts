export const NOTIFICATION_CONSTANTS = {
  MAX_TITLE_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 500,
  BATCH_SIZE: 100,  
  RETENTION_DAYS: 30,  
  MAX_UNREAD: 100,  
  RATE_LIMIT: 50, 
  DEFAULT_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const NOTIFICATION_MESSAGES = {
  SENT: "Notification sent successfully",
  MARKED_READ: "Notification marked as read",
  MARKED_UNREAD: "Notification marked as unread",
  DELETED: "Notification deleted",
  NOT_FOUND: "Notification not found",
  BATCH_SENT: "Batch notifications sent successfully",
};

export const NOTIFICATION_TEMPLATES = {
  COURSE_PURCHASE: {
    title: "Course Purchased Successfully!",
    message:
      "You have successfully enrolled in {{courseName}}. Start learning now!",
    actionText: "Start Learning",
  },
  CERTIFICATE_GENERATED: {
    title: "Certificate Ready!",
    message:
      "Congratulations! Your certificate for {{courseName}} is ready to download.",
    actionText: "Download Certificate",
  },
  INSTITUTE_APPROVED: {
    title: "Institute Approved!",
    message:
      'Your institute "{{instituteName}}" has been approved. You can now start creating courses.',
    actionText: "Go to Dashboard",
  },
};
