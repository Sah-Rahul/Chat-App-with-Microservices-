import mongoose, { Schema, Document } from "mongoose";
import { PaymentGateway, PaymentMethod, PaymentStatus } from "./payment.enums";

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  gateway: PaymentGateway;
  transactionId?: string;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  metadata?: {
    cardLast4?: string;
    cardBrand?: string;
    upiId?: string;
    bankName?: string;
    walletType?: string;
  };
  failureReason?: string;
  refundId?: string;
  refundAmount?: number;
  refundedAt?: Date;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    method: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    gateway: {
      type: String,
      enum: Object.values(PaymentGateway),
      required: true,
    },
    transactionId: { type: String, unique: true, sparse: true },
    gatewayOrderId: String,
    gatewayPaymentId: String,
    gatewaySignature: String,
    metadata: {
      cardLast4: String,
      cardBrand: String,
      upiId: String,
      bankName: String,
      walletType: String,
    },
    failureReason: String,
    refundId: String,
    refundAmount: Number,
    refundedAt: Date,
    paidAt: Date,
  },
  { timestamps: true },
);

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ createdAt: -1 });

 const PaymentModel = mongoose.model<IPayment>("Payment", paymentSchema);
export default PaymentModel