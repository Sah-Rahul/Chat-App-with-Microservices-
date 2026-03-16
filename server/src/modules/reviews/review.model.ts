import mongoose, { Schema, Document } from "mongoose";
import { ReviewStatus, ReviewType } from "./review.enums";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  type: ReviewType;
  courseId?: mongoose.Types.ObjectId;
  instituteId?: mongoose.Types.ObjectId;
  enrollmentId?: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
  status: ReviewStatus;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    type: { type: String, enum: Object.values(ReviewType), required: true },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: function () {
        return this.type === ReviewType.COURSE;
      },
    },

    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: function () {
        return this.type === ReviewType.INSTITUTE;
      },
    },

    enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollment" },

    comment: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },

    status: {
      type: String,
      enum: Object.values(ReviewStatus),
      default: ReviewStatus.PENDING,
    },

    isVerifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true },
);

reviewSchema.index({ courseId: 1, status: 1 });
reviewSchema.index({ instituteId: 1, status: 1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ createdAt: -1 });

reviewSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true, partialFilterExpression: { courseId: { $exists: true } } }
);

reviewSchema.index(
  { userId: 1, instituteId: 1 },
  { unique: true, partialFilterExpression: { instituteId: { $exists: true } } }
);

const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
export default ReviewModel;