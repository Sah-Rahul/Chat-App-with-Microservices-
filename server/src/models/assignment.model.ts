import mongoose, { Schema, Document, Model } from "mongoose";

export enum AssignmentStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum AssignmentPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface ATask extends Document {
  title: string;
  description: string;
  assignedBy: mongoose.Types.ObjectId;   
  assignedTo?: mongoose.Types.ObjectId;  
  submittedBy?: mongoose.Types.ObjectId; 
  deadLine: Date;

  status: AssignmentStatus;
  priority: AssignmentPriority;

  submittedAt?: Date;
  submissionFile?: string;
  submissionText?: string;

  marks?: number;
  totalMarks?: number;
  feedback?: string;

  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<ATask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      maxlength: 2000,
    },

    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    deadLine: {
      type: Date,
      required: [true, "Due date is required"],
    },

    status: {
      type: String,
      enum: Object.values(AssignmentStatus),
      default: AssignmentStatus.PENDING,
    },

    priority: {
      type: String,
      enum: Object.values(AssignmentPriority),
      default: AssignmentPriority.MEDIUM,
    },

    submittedAt: {
      type: Date,
    },

    submissionFile: {
      type: String,
    },

    submissionText: {
      type: String,
      maxlength: 5000,
    },

    marks: {
      type: Number,
      min: 0,
    },

    totalMarks: {
      type: Number,
      min: 0,
    },

    feedback: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

 
AssignmentSchema.index({ assignedTo: 1, status: 1 });
AssignmentSchema.index({ assignedBy: 1 });
AssignmentSchema.index({ deadline: 1 });

export const AssignmentModel: Model<ATask> =
  mongoose.models.Assignment ||
  mongoose.model<ATask>("Assignment", AssignmentSchema);
