import mongoose, { Schema, Document } from "mongoose";
import { CouponStatus, CouponType, DiscountType } from "./coupon.enums";

export interface ICoupon extends Document {
  code: string;
  description?: string;
  type: CouponType;
  discountType: DiscountType;
  discountValue: number;
  maxDiscount?: number;
  minPurchaseAmount: number;
  status: CouponStatus;
  applicableOn: {
    courses?: mongoose.Types.ObjectId[];
    categories?: mongoose.Types.ObjectId[];
    institutes?: mongoose.Types.ObjectId[];
    allCourses?: boolean;
  };
  usageLimit: {
    total?: number;
    perUser?: number;
  };
  usageCount: {
    total: number;
    byUser: Map<string, number>;
  };
  validFrom: Date;
  validUntil: Date;
  restrictions?: {
    firstPurchaseOnly?: boolean;
    newUsersOnly?: boolean;
    minCoursesInCart?: number;
    excludedCourses?: mongoose.Types.ObjectId[];
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: { type: String, trim: true },
    type: {
      type: String,
      enum: Object.values(CouponType),
      required: true,
    },
    discountType: {
      type: String,
      enum: Object.values(DiscountType),
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    maxDiscount: { type: Number, min: 0 },
    minPurchaseAmount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: Object.values(CouponStatus),
      default: CouponStatus.ACTIVE,
    },
    applicableOn: {
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
      institutes: [{ type: Schema.Types.ObjectId, ref: "Institute" }],
      allCourses: { type: Boolean, default: false },
    },
    usageLimit: {
      total: Number,
      perUser: { type: Number, default: 1 },
    },
    usageCount: {
      total: { type: Number, default: 0 },
      byUser: { type: Map, of: Number, default: {} },
    },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    restrictions: {
      firstPurchaseOnly: { type: Boolean, default: false },
      newUsersOnly: { type: Boolean, default: false },
      minCoursesInCart: { type: Number, default: 1 },
      excludedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

couponSchema.index({ code: 1 });
couponSchema.index({ status: 1, validFrom: 1, validUntil: 1 });
couponSchema.index({ createdBy: 1 });

const CouponModel = mongoose.model<ICoupon>("Coupon", couponSchema);

export default CouponModel