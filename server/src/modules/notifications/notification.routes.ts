import express from "express";
import * as notificationController from "./notification.controller";
import {
  createNotificationSchema,
  sendBulkNotificationSchema,
  getNotificationsQuerySchema,
  markAsReadSchema,
} from "./notification.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";

const notificationRoutes = express.Router();

notificationRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  validate(createNotificationSchema),
  notificationController.createNotification,
);

notificationRoutes.post(
  "/bulk",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  validate(sendBulkNotificationSchema),
  notificationController.sendBulkNotification,
);

notificationRoutes.get(
  "/all",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  validate(getNotificationsQuerySchema),
  notificationController.getNotifications,
);

notificationRoutes.get("/my", isAuthenticated, notificationController.getMyNotifications);

notificationRoutes.get(
  "/unread-count",
  isAuthenticated,
  notificationController.getUnreadCount,
);

notificationRoutes.patch(
  "/:id/read",
  isAuthenticated,
  validate(markAsReadSchema),
  notificationController.markAsRead,
);

notificationRoutes.patch(
  "/read-all",
  isAuthenticated,
  notificationController.markAllAsRead,
);

notificationRoutes.delete(
  "/:id",
  isAuthenticated,
  validate(markAsReadSchema),
  notificationController.deleteNotification,
);

notificationRoutes.delete(
  "/",
  isAuthenticated,
  notificationController.deleteAllNotifications,
);

export default notificationRoutes;
