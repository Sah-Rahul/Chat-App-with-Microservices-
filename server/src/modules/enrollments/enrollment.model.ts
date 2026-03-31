import mongoose, { Schema, Document } from "mongoose";
import { EnrollmentStatus, EnrollmentType } from "./enrollment.enums";

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  instituteId: mongoose.Types.ObjectId;
  orderId?: mongoose.Types.ObjectId;
  type: EnrollmentType;
  status: EnrollmentStatus;
  progress: number; // 0-100
  completedLectures: number;
  totalLectures: number;
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  certificateId?: mongoose.Types.ObjectId;
  lastAccessedAt?: Date;
  expiresAt?: Date;
  validity: number; // in days, 0 = lifetime
  accessRevokedAt?: Date;
  revokeReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    type: {
      type: String,
      enum: Object.values(EnrollmentType),
      default: EnrollmentType.PAID,
    },
    status: {
      type: String,
      enum: Object.values(EnrollmentStatus),
      default: EnrollmentStatus.ACTIVE,
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    completedLectures: { type: Number, default: 0 },
    totalLectures: { type: Number, required: true },
    enrolledAt: { type: Date, default: Date.now },
    startedAt: Date,
    completedAt: Date,
    certificateId: { type: Schema.Types.ObjectId, ref: "Certificate" },
    lastAccessedAt: Date,
    expiresAt: Date,
    validity: { type: Number, default: 0 }, // 0 = lifetime
    accessRevokedAt: Date,
    revokeReason: String,
  },
  { timestamps: true },
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
enrollmentSchema.index({ userId: 1, status: 1 });
enrollmentSchema.index({ courseId: 1, status: 1 });
enrollmentSchema.index({ completedAt: -1 });

// Calculate expiry date
enrollmentSchema.pre("save", function (next) {
  if (this.validity > 0 && !this.expiresAt) {
    this.expiresAt = new Date(
      this.enrolledAt.getTime() + this.validity * 24 * 60 * 60 * 1000,
    );
  }
});

const EnrollmentModel = mongoose.model<IEnrollment>(
  "Enrollment",
  enrollmentSchema,
);
export default EnrollmentModel;
