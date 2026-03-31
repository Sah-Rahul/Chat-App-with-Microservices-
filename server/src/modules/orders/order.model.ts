import mongoose, { Schema, Document } from "mongoose";
import { OrderStatus, OrderType } from "./order.enums";

export interface IOrderItem {
  courseId: mongoose.Types.ObjectId;
  courseName: string;
  coursePrice: number;
  discountedPrice?: number;
  finalPrice: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  couponCode?: string;
  couponDiscount?: number;
  status: OrderStatus;
  type: OrderType;
  paymentId?: mongoose.Types.ObjectId;
  notes?: string;
  cancelledAt?: Date;
  cancelReason?: string;
  refundedAt?: Date;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
        finalPrice: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    couponCode: { type: String, uppercase: true },
    couponDiscount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    type: {
      type: String,
      enum: Object.values(OrderType),
      default: OrderType.COURSE_PURCHASE,
    },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    notes: String,
    cancelledAt: Date,
    cancelReason: String,
    refundedAt: Date,
    refundAmount: Number,
  },
  { timestamps: true },
);

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ userId: 1, status: 1 });
orderSchema.index({ createdAt: -1 });

// Generate unique order number
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD${Date.now()}${String(count + 1).padStart(4, "0")}`;
  }
});

const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel