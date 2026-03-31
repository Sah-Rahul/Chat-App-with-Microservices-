export interface CreateNotificationDTO {
  userId: string;
  type: string;
  priority: string;
  title: string;
  message: string;
  imageUrl?: string;
  actionUrl?: string;
  actionText?: string;
  data?: Record<string, any>;
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface SendBulkNotificationDTO {
  userIds: string[];
  type: string;
  priority: string;
  title: string;
  message: string;
  imageUrl?: string;
  actionUrl?: string;
  actionText?: string;
  data?: Record<string, any>;
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface GetNotificationsQueryDTO {
  userId?: string;
  type?: string;
  priority?: string;
  status?: string;
  isRead?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
