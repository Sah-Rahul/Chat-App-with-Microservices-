import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
  }),
});

export const applyCouponSchema = z.object({
  body: z.object({
    couponCode: z.string().min(1).max(20),
  }),
});

export const removeFromCartSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
});
