import mongoose, { Schema, Document } from "mongoose";
import { ReviewStatus, ReviewType } from "./review.enums";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  type: ReviewType;
  courseId?: mongoose.Types.ObjectId;
  instituteId?: mongoose.Types.ObjectId;
  enrollmentId?: mongoose.Types.ObjectId;
  title?: string;
  comment: string;
  status: ReviewStatus;
  isVerifiedPurchase: boolean;
  replies?: Array<{
    userId: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(ReviewType),
      required: true,
    },

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

    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
    },

    title: {
      type: String,
      trim: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(ReviewStatus),
      default: ReviewStatus.PENDING,
    },

    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },

    replies: [
      {
        _id: false,
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

reviewSchema.index({ courseId: 1, status: 1 });
reviewSchema.index({ instituteId: 1, status: 1 });

reviewSchema.index({ userId: 1 });

reviewSchema.index({ createdAt: -1 });

reviewSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true, partialFilterExpression: { courseId: { $exists: true } } },
);

reviewSchema.index(
  { userId: 1, instituteId: 1 },
  { unique: true, partialFilterExpression: { instituteId: { $exists: true } } },
);

const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);

export default ReviewModel;
