import {
  CreateNotificationDTO,
  SendBulkNotificationDTO,
  GetNotificationsQueryDTO,
} from "./notification.dto";

export const createNotification = async (data: CreateNotificationDTO) => {
  // TODO: Create and send notification
};

export const sendBulkNotification = async (data: SendBulkNotificationDTO) => {
  // TODO: Send notification to multiple users
};

export const getNotifications = async (query: GetNotificationsQueryDTO) => {
  // TODO: Get notifications with filters
};

export const getNotificationById = async (notificationId: string) => {
  // TODO: Get notification by ID
};

export const getMyNotifications = async (userId: string, query: any) => {
  // TODO: Get user's notifications
};

export const markAsRead = async (notificationId: string, userId: string) => {
  // TODO: Mark notification as read
};

export const markAllAsRead = async (userId: string) => {
  // TODO: Mark all notifications as read
};

export const deleteNotification = async (
  notificationId: string,
  userId: string,
) => {
  // TODO: Delete notification
};

export const deleteAllNotifications = async (userId: string) => {
  // TODO: Delete all notifications for user
};

export const getUnreadCount = async (userId: string) => {
  // TODO: Get unread notification count
};

export const sendSystemNotification = async (
  title: string,
  message: string,
  userIds?: string[],
) => {
  // TODO: Send system-wide notification
};
