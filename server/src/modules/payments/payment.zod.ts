import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    amount: z.number().min(1),
    method: z.enum([
      "credit_card",
      "debit_card",
      "upi",
      "net_banking",
      "wallet",
      "emi",
    ]),
    gateway: z.enum(["razorpay", "stripe", "paytm", "phonepe"]),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    paymentId: z.string().min(1),
    signature: z.string().min(1),
  }),
});

export const refundPaymentSchema = z.object({
  params: z.object({
    paymentId: z.string().min(1),
  }),
  body: z.object({
    amount: z.number().min(1).optional(),
    reason: z.string().min(10),
  }),
});

export const getPaymentsQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    orderId: z.string().optional(),
    status: z.string().optional(),
    method: z.string().optional(),
    gateway: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
