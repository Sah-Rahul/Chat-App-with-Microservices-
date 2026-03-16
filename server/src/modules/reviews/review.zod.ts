import { z } from "zod";
import { REVIEW_CONSTANTS } from "./review.constants";

export const createReviewSchema = z.object({
  type: z.literal("course").optional(),
  courseSlug: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().min(REVIEW_CONSTANTS.MIN_COMMENT_LENGTH).max(REVIEW_CONSTANTS.MAX_COMMENT_LENGTH),
});

export const updateReviewSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().min(REVIEW_CONSTANTS.MIN_COMMENT_LENGTH).max(REVIEW_CONSTANTS.MAX_COMMENT_LENGTH).optional(),
});

export const getReviewsQuerySchema = z.object({
  courseSlug: z.string().optional(),
  userId: z.string().optional(),
  status: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});