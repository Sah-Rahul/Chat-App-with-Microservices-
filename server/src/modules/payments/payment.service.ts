import Stripe from "stripe";
import crypto from "crypto";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import {
  CreatePaymentDTO,
  VerifyPaymentDTO,
  GetPaymentsQueryDTO,
} from "./payment.dto";
import { PaymentGateway, PaymentMethod, PaymentStatus } from "./payment.enums";
import PaymentModel from "./payment.model";
import OrderModel from "../orders/order.model";
import { OrderStatus } from "../orders/order.enums";
import { PAYMENT_MESSAGES } from "./payment.constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

export const createPayment = async (data: CreatePaymentDTO, userId: string) => {
  const order = await OrderModel.findById(data.orderId);

  if (!order) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Order not found");
  }

  if (order.userId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Access denied");
  }

  if (order.status !== OrderStatus.PENDING) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      PAYMENT_MESSAGES.ALREADY_PROCESSED,
    );
  }

  // Stripe PaymentIntent create karo
  // amount Stripe mein paise (cents/paisa) mein hota hai — rupees × 100
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: order.currency.toLowerCase(),
    metadata: {
      orderId: order._id.toString(),
      userId,
      orderNumber: order.orderNumber,
    },
  });

  const payment = await PaymentModel.create({
    orderId: order._id,
    userId,
    amount: order.total,
    currency: order.currency,
    status: PaymentStatus.PENDING,
    method: data.method as PaymentMethod,
    gateway: PaymentGateway.STRIPE,
    gatewayOrderId: paymentIntent.id,
  });

  await OrderModel.findByIdAndUpdate(order._id, { paymentId: payment._id });

  return {
    paymentId: payment._id,
    clientSecret: paymentIntent.client_secret,
    amount: order.total,
    currency: order.currency,
  };
};

export const verifyPayment = async (data: VerifyPaymentDTO, userId: string) => {
  const { orderId, paymentId, signature } = data;

  const payment = await PaymentModel.findOne({ gatewayOrderId: paymentId });
  if (!payment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, PAYMENT_MESSAGES.NOT_FOUND);
  }

  if (payment.status === PaymentStatus.SUCCESS) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      PAYMENT_MESSAGES.ALREADY_PROCESSED,
    );
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

  if (paymentIntent.status !== "succeeded") {
    await PaymentModel.findByIdAndUpdate(payment._id, {
      status: PaymentStatus.FAILED,
      failureReason:
        paymentIntent.last_payment_error?.message ?? "Payment not succeeded",
    });
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, PAYMENT_MESSAGES.FAILED);
  }

  await PaymentModel.findByIdAndUpdate(payment._id, {
    status: PaymentStatus.SUCCESS,
    gatewayPaymentId: paymentIntent.id,
    paidAt: new Date(),
  });

  await OrderModel.findByIdAndUpdate(orderId, {
    status: OrderStatus.COMPLETED,
  });

  return { success: true, paymentId: payment._id };
};

export const handleWebhook = async (rawBody: Buffer, signature: string) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      PAYMENT_MESSAGES.INVALID_SIGNATURE,
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      const payment = await PaymentModel.findOne({
        gatewayOrderId: paymentIntent.id,
      });

      if (payment && payment.status !== PaymentStatus.SUCCESS) {
        await PaymentModel.findByIdAndUpdate(payment._id, {
          status: PaymentStatus.SUCCESS,
          gatewayPaymentId: paymentIntent.id,
          paidAt: new Date(),
        });

        await OrderModel.findByIdAndUpdate(orderId, {
          status: OrderStatus.COMPLETED,
        });
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await PaymentModel.findOneAndUpdate(
        { gatewayOrderId: paymentIntent.id },
        {
          status: PaymentStatus.FAILED,
          failureReason:
            paymentIntent.last_payment_error?.message ?? "Payment failed",
        },
      );

      await OrderModel.findByIdAndUpdate(paymentIntent.metadata.orderId, {
        status: OrderStatus.FAILED,
      });
      break;
    }

    case "payment_intent.canceled": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await PaymentModel.findOneAndUpdate(
        { gatewayOrderId: paymentIntent.id },
        { status: PaymentStatus.CANCELLED },
      );
      break;
    }
  }

  return { received: true };
};

export const getPaymentById = async (paymentId: string, userId?: string) => {
  const payment = await PaymentModel.findById(paymentId)
    .populate("orderId", "orderNumber total status")
    .populate("userId", "firstName lastName email");

  if (!payment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, PAYMENT_MESSAGES.NOT_FOUND);
  }

  if (userId && payment.userId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Access denied");
  }

  return payment;
};

export const getAllPayments = async (query: GetPaymentsQueryDTO) => {
  const {
    userId,
    orderId,
    status,
    method,
    gateway,
    startDate,
    endDate,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter: Record<string, any> = {};

  if (userId) filter.userId = userId;
  if (orderId) filter.orderId = orderId;
  if (status) filter.status = status;
  if (method) filter.method = method;
  if (gateway) filter.gateway = gateway;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = startDate;
    if (endDate) filter.createdAt.$lte = endDate;
  }

  const skip = (page - 1) * limit;

  const [payments, total] = await Promise.all([
    PaymentModel.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "firstName lastName email")
      .populate("orderId", "orderNumber total"),
    PaymentModel.countDocuments(filter),
  ]);

  return { payments, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getPaymentStatistics = async (filters: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const matchStage: Record<string, any> = {};

  if (filters.startDate || filters.endDate) {
    matchStage.createdAt = {};
    if (filters.startDate) matchStage.createdAt.$gte = filters.startDate;
    if (filters.endDate) matchStage.createdAt.$lte = filters.endDate;
  }

  const stats = await PaymentModel.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalPayments: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [{ $eq: ["$status", PaymentStatus.SUCCESS] }, "$amount", 0],
          },
        },
        successfulPayments: {
          $sum: { $cond: [{ $eq: ["$status", PaymentStatus.SUCCESS] }, 1, 0] },
        },
        failedPayments: {
          $sum: { $cond: [{ $eq: ["$status", PaymentStatus.FAILED] }, 1, 0] },
        },
        pendingPayments: {
          $sum: { $cond: [{ $eq: ["$status", PaymentStatus.PENDING] }, 1, 0] },
        },
        avgPaymentAmount: { $avg: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        totalPayments: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] },
        successfulPayments: 1,
        failedPayments: 1,
        pendingPayments: 1,
        avgPaymentAmount: { $round: ["$avgPaymentAmount", 2] },
        successRate: {
          $round: [
            {
              $multiply: [
                { $divide: ["$successfulPayments", "$totalPayments"] },
                100,
              ],
            },
            2,
          ],
        },
      },
    },
  ]);

  return (
    stats[0] ?? {
      totalPayments: 0,
      totalRevenue: 0,
      successfulPayments: 0,
      failedPayments: 0,
      pendingPayments: 0,
      avgPaymentAmount: 0,
      successRate: 0,
    }
  );
};
