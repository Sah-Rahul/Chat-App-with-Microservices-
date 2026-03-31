import mongoose, { Schema, Document } from "mongoose";
import { MessageStatus, MessageType } from "./message.enums";

export interface IAttachment {
  type: "image" | "video" | "audio" | "document" | "file";
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  thumbnail?: string;
}

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  type: MessageType;
  status: MessageStatus;
  content?: string;
  attachments?: IAttachment[];
  replyTo?: mongoose.Types.ObjectId;
  forwardedFrom?: mongoose.Types.ObjectId;
  metadata?: {
    isEdited?: boolean;
    editedAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
    deleteType?: "soft" | "hard";
  };
  readBy: Array<{
    userId: mongoose.Types.ObjectId;
    readAt: Date;
  }>;
  deliveredTo: Array<{
    userId: mongoose.Types.ObjectId;
    deliveredAt: Date;
  }>;
  reactions?: Array<{
    userId: mongoose.Types.ObjectId;
    emoji: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(MessageType),
      default: MessageType.TEXT,
    },
    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.SENT,
    },
    content: { type: String, trim: true },
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "video", "audio", "document", "file"],
          required: true,
        },
        url: { type: String, required: true },
        filename: { type: String, required: true },
        size: { type: Number, required: true },
        mimeType: { type: String, required: true },
        thumbnail: String,
      },
    ],
    replyTo: { type: Schema.Types.ObjectId, ref: "Message" },
    forwardedFrom: { type: Schema.Types.ObjectId, ref: "Message" },
    metadata: {
      isEdited: { type: Boolean, default: false },
      editedAt: Date,
      isDeleted: { type: Boolean, default: false },
      deletedAt: Date,
      deleteType: { type: String, enum: ["soft", "hard"] },
    },
    readBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        readAt: { type: Date, required: true },
      },
    ],
    deliveredTo: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        deliveredAt: { type: Date, required: true },
      },
    ],
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        emoji: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ sender: 1, createdAt: -1 });
messageSchema.index({ conversationId: 1, "readBy.userId": 1 });

export const Message = mongoose.model<IMessage>("Message", messageSchema);
