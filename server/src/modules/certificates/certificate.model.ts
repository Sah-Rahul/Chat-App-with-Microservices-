import mongoose, { Schema, Document } from "mongoose";
import { CertificateStatus, CertificateType } from "./certificate.enums";

export interface ICertificate extends Document {
  certificateNumber: string;
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  instituteId: mongoose.Types.ObjectId;
  enrollmentId: mongoose.Types.ObjectId;
  type: CertificateType;
  status: CertificateStatus;
  studentName: string;
  courseName: string;
  instituteName: string;
  completionDate: Date;
  issueDate: Date;
  grade?: string;
  score?: number;
  credits?: number;
  instructorName?: string;
  instructorSignature?: string;
  instituteLogoUrl?: string;
  certificateUrl?: string;
  certificateHash?: string;
  qrCodeUrl?: string;
  metadata?: {
    duration?: number; // course duration in hours
    skills?: string[];
    achievements?: string[];
  };
  isVerified: boolean;
  verificationUrl?: string;
  downloadCount: number;
  sharedOn?: Array<{
    platform: string;
    sharedAt: Date;
  }>;
  revokedAt?: Date;
  revokeReason?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const certificateSchema = new Schema<ICertificate>(
  {
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CertificateType),
      default: CertificateType.COMPLETION,
    },
    status: {
      type: String,
      enum: Object.values(CertificateStatus),
      default: CertificateStatus.PENDING,
    },
    studentName: { type: String, required: true },
    courseName: { type: String, required: true },
    instituteName: { type: String, required: true },
    completionDate: { type: Date, required: true },
    issueDate: { type: Date, default: Date.now },
    grade: String,
    score: { type: Number, min: 0, max: 100 },
    credits: Number,
    instructorName: String,
    instructorSignature: String,
    instituteLogoUrl: String,
    certificateUrl: String,
    certificateHash: String,
    qrCodeUrl: String,
    metadata: {
      duration: Number,
      skills: [String],
      achievements: [String],
    },
    isVerified: { type: Boolean, default: false },
    verificationUrl: String,
    downloadCount: { type: Number, default: 0 },
    sharedOn: [
      {
        platform: String,
        sharedAt: Date,
      },
    ],
    revokedAt: Date,
    revokeReason: String,
    expiresAt: Date,
  },
  { timestamps: true },
);

certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ userId: 1, status: 1 });
certificateSchema.index({ courseId: 1 });
certificateSchema.index({ instituteId: 1 });
certificateSchema.index({ issueDate: -1 });
certificateSchema.index({ certificateHash: 1 });

// Generate unique certificate number
certificateSchema.pre("save", async function (next) {
  if (!this.certificateNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("Certificate").countDocuments();
    this.certificateNumber = `CERT${year}${String(count + 1).padStart(6, "0")}`;
  }
});

const CertificateModel = mongoose.model<ICertificate>(
  "Certificate",
  certificateSchema,
);

export default CertificateModel;
