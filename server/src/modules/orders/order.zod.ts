import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          courseId: z.string().min(1),
        }),
      )
      .min(1),
    couponCode: z.string().optional(),
  }),
});

export const updateOrderSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    status: z
      .enum([
        "pending",
        "processing",
        "completed",
        "cancelled",
        "refunded",
        "failed",
      ])
      .optional(),
    notes: z.string().optional(),
  }),
});

export const getOrdersQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
