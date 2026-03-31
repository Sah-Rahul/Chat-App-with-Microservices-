import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  courseId: mongoose.Types.ObjectId;
  courseName: string;
  coursePrice: number;
  discountedPrice?: number;
  thumbnail?: string;
  addedAt: Date;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  totalItems: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        courseName: { type: String, required: true },
        coursePrice: { type: Number, required: true },
        discountedPrice: Number,
        thumbnail: String,
        addedAt: { type: Date, default: Date.now },
      },
    ],
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    couponCode: { type: String, uppercase: true },
    couponDiscount: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

cartSchema.index({ userId: 1 });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Calculate totals before saving
cartSchema.pre("save", function (next) {
  this.totalItems = this.items.length;
  this.subtotal = this.items.reduce(
    (sum, item) => sum + (item.discountedPrice || item.coursePrice),
    0,
  );
  this.total = this.subtotal - this.discount - (this.couponDiscount || 0);

  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  }
});

const CartModel = mongoose.model<ICart>("Cart", cartSchema);

export default CartModel