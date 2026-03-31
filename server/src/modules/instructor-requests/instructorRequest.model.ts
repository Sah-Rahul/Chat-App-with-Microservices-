import mongoose, { Schema, Document } from "mongoose";
import {
  ExpertiseLevel,
  InstructorRequestStatus,
} from "./instructorRequest.enums";

export interface IInstructorRequest extends Document {
  userId: mongoose.Types.ObjectId;
  instituteId?: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  expertise: string[];
  experienceYears: number;
  expertiseLevel: ExpertiseLevel;
  qualifications: Array<{
    degree: string;
    institution: string;
    year: number;
    field: string;
  }>;
  workExperience: Array<{
    designation: string;
    company: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }>;
  achievements?: string[];
  socialLinks?: {
    linkedin?: string;
    youtube?: string;
    github?: string;
    portfolio?: string;
    other?: string;
  };
  sampleContent?: Array<{
    type: "video" | "article" | "project";
    title: string;
    url: string;
  }>;
  documents: Array<{
    type: string;
    name: string;
    url: string;
    uploadedAt: Date;
  }>;
  status: InstructorRequestStatus;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  approvalNotes?: string;
  rejectionReason?: string;
  interviewScheduled?: Date;
  interviewNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const instructorRequestSchema = new Schema<IInstructorRequest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    instituteId: { type: Schema.Types.ObjectId, ref: "Institute" },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    bio: { type: String, required: true },
    expertise: [{ type: String, required: true }],
    experienceYears: { type: Number, required: true, min: 0 },
    expertiseLevel: {
      type: String,
      enum: Object.values(ExpertiseLevel),
      required: true,
    },
    qualifications: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: Number, required: true },
        field: { type: String, required: true },
      },
    ],
    workExperience: [
      {
        designation: { type: String, required: true },
        company: { type: String, required: true },
        from: { type: Date, required: true },
        to: Date,
        current: { type: Boolean, default: false },
        description: String,
      },
    ],
    achievements: [String],
    socialLinks: {
      linkedin: String,
      youtube: String,
      github: String,
      portfolio: String,
      other: String,
    },
    sampleContent: [
      {
        type: {
          type: String,
          enum: ["video", "article", "project"],
          required: true,
        },
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    documents: [
      {
        type: { type: String, required: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: Object.values(InstructorRequestStatus),
      default: InstructorRequestStatus.PENDING,
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    approvalNotes: String,
    rejectionReason: String,
    interviewScheduled: Date,
    interviewNotes: String,
  },
  { timestamps: true },
);

instructorRequestSchema.index({ userId: 1 });
instructorRequestSchema.index({ status: 1 });
instructorRequestSchema.index({ createdAt: -1 });

const InstructorRequestModel = mongoose.model<IInstructorRequest>(
  "InstructorRequest",
  instructorRequestSchema,
);

export default InstructorRequestModel;
