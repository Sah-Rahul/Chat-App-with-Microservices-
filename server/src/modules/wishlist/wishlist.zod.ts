import { z } from "zod";

export const addToWishlistSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    notifyOnDiscount: z.boolean().optional(),
  }),
});

export const updateWishlistItemSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
  body: z.object({
    notifyOnDiscount: z.boolean(),
  }),
});

export const removeFromWishlistSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
});
