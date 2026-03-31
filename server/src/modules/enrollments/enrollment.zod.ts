import { z } from "zod";

export const createEnrollmentSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    orderId: z.string().optional(),
    type: z.enum([
      "paid",
      "free",
      "scholarship",
      "promotional",
      "institute_student",
    ]),
    validity: z.number().min(0).optional(),
  }),
});

export const updateEnrollmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    status: z
      .enum(["active", "completed", "expired", "revoked", "suspended"])
      .optional(),
    validity: z.number().min(0).optional(),
  }),
});

export const getEnrollmentsQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    courseId: z.string().optional(),
    instituteId: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const getEnrollmentByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
