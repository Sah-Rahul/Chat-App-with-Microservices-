import { z } from "zod";
import { REVIEW_CONSTANTS } from "./review.constants";

export const createReviewSchema = z
  .object({
    type: z.enum(["course", "institute"]),

    courseId: z.string().optional(),
    instituteId: z.string().optional(),

    rating: z.number().min(1).max(5),

    title: z
      .string()
      .min(REVIEW_CONSTANTS.MIN_TITLE_LENGTH)
      .max(REVIEW_CONSTANTS.MAX_TITLE_LENGTH)
      .optional(),

    comment: z
      .string()
      .min(REVIEW_CONSTANTS.MIN_COMMENT_LENGTH)
      .max(REVIEW_CONSTANTS.MAX_COMMENT_LENGTH),

    pros: z.array(z.string()).max(REVIEW_CONSTANTS.MAX_PROS).optional(),

    cons: z.array(z.string()).max(REVIEW_CONSTANTS.MAX_CONS).optional(),
  })
  .refine(
    (data) =>
      (data.type === "course" && !!data.courseId) ||
      (data.type === "institute" && !!data.instituteId),
    {
      message:
        "courseId is required when type is 'course' and instituteId is required when type is 'institute'",
      path: ["type"],
    },
  );

export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),

  rating: z.number().min(1).max(5).optional(),

  title: z
    .string()
    .min(REVIEW_CONSTANTS.MIN_TITLE_LENGTH)
    .max(REVIEW_CONSTANTS.MAX_TITLE_LENGTH)
    .optional(),

  comment: z
    .string()
    .min(REVIEW_CONSTANTS.MIN_COMMENT_LENGTH)
    .max(REVIEW_CONSTANTS.MAX_COMMENT_LENGTH)
    .optional(),

  pros: z.array(z.string()).max(REVIEW_CONSTANTS.MAX_PROS).optional(),

  cons: z.array(z.string()).max(REVIEW_CONSTANTS.MAX_CONS).optional(),
});

export const getReviewsQuerySchema = z.object({
  query: z.object({
    type: z.enum(["course", "institute"]).optional(),
    courseId: z.string().optional(),
    instituteId: z.string().optional(),
    userId: z.string().optional(),
    status: z.string().optional(),

    rating: z.coerce.number().min(1).max(5).optional(),

    page: z.coerce.number().min(1).default(1),

    limit: z.coerce.number().min(1).max(100).default(10),

    sortBy: z.string().optional(),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});
