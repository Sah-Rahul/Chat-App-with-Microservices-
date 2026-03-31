import mongoose, { Schema, Document } from "mongoose";
import {
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from "./notification.enums";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  imageUrl?: string;
  actionUrl?: string;
  actionText?: string;
  data?: {
    courseId?: mongoose.Types.ObjectId;
    instituteId?: mongoose.Types.ObjectId;
    orderId?: mongoose.Types.ObjectId;
    enrollmentId?: mongoose.Types.ObjectId;
    certificateId?: mongoose.Types.ObjectId;
    messageId?: mongoose.Types.ObjectId;
    [key: string]: any;
  };
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  sentChannels?: {
    inApp?: Date;
    email?: Date;
    sms?: Date;
    push?: Date;
  };
  readAt?: Date;
  clickedAt?: Date;
  deletedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(NotificationPriority),
      default: NotificationPriority.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(NotificationStatus),
      default: NotificationStatus.PENDING,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: String,
    actionUrl: String,
    actionText: String,
    data: {
      courseId: { type: Schema.Types.ObjectId, ref: "Course" },
      instituteId: { type: Schema.Types.ObjectId, ref: "Institute" },
      orderId: { type: Schema.Types.ObjectId, ref: "Order" },
      enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollment" },
      certificateId: { type: Schema.Types.ObjectId, ref: "Certificate" },
      messageId: { type: Schema.Types.ObjectId, ref: "Message" },
    },
    channels: {
      inApp: { type: Boolean, default: true },
      email: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },
    sentChannels: {
      inApp: Date,
      email: Date,
      sms: Date,
      push: Date,
    },
    readAt: Date,
    clickedAt: Date,
    deletedAt: Date,
    expiresAt: Date,
  },
  { timestamps: true },
);

notificationSchema.index({ userId: 1, status: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, readAt: 1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

const NotificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
export default NotificationModel;
