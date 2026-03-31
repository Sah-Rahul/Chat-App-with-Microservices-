import mongoose, { Schema, Document } from "mongoose";
import { ConversationStatus, ConversationType } from "./conversation.enums";

export interface IParticipant {
  userId: mongoose.Types.ObjectId;
  role: "student" | "instructor" | "admin" | "support";
  joinedAt: Date;
  leftAt?: Date;
  unreadCount: number;
  lastReadAt?: Date;
  isMuted: boolean;
  isBlocked: boolean;
}

export interface IConversation extends Document {
  type: ConversationType;
  status: ConversationStatus;
  participants: IParticipant[];
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  title?: string;
  description?: string;
  avatar?: string;
  courseId?: mongoose.Types.ObjectId;
  instituteId?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  metadata?: {
    isSupport?: boolean;
    supportTicketId?: string;
    tags?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    type: {
      type: String,
      enum: Object.values(ConversationType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ConversationStatus),
      default: ConversationStatus.ACTIVE,
    },
    participants: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: {
          type: String,
          enum: ["student", "instructor", "admin", "support"],
          default: "student",
        },
        joinedAt: { type: Date, default: Date.now },
        leftAt: Date,
        unreadCount: { type: Number, default: 0 },
        lastReadAt: Date,
        isMuted: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false },
      },
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    lastMessageAt: Date,
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    avatar: String,
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    instituteId: { type: Schema.Types.ObjectId, ref: "Institute" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    metadata: {
      isSupport: { type: Boolean, default: false },
      supportTicketId: String,
      tags: [String],
    },
  },
  { timestamps: true },
);

conversationSchema.index({ "participants.userId": 1, status: 1 });
conversationSchema.index({ lastMessageAt: -1 });
conversationSchema.index({ type: 1, status: 1 });
conversationSchema.index({ courseId: 1 });
conversationSchema.index({ instituteId: 1 });

export const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema,
);
