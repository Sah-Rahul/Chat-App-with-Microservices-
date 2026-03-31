import { z } from "zod";

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(4).max(20).toUpperCase(),
    description: z.string().optional(),
    type: z.enum(["public", "private", "promotional", "referral", "seasonal"]),
    discountType: z.enum(["percentage", "fixed"]),
    discountValue: z.number().min(0),
    maxDiscount: z.number().min(0).optional(),
    minPurchaseAmount: z.number().min(0),
    applicableOn: z.object({
      courses: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      institutes: z.array(z.string()).optional(),
      allCourses: z.boolean().optional(),
    }),
    usageLimit: z
      .object({
        total: z.number().min(1).optional(),
        perUser: z.number().min(1).optional(),
      })
      .optional(),
    validFrom: z.string().datetime(),
    validUntil: z.string().datetime(),
    restrictions: z
      .object({
        firstPurchaseOnly: z.boolean().optional(),
        newUsersOnly: z.boolean().optional(),
        minCoursesInCart: z.number().min(1).optional(),
        excludedCourses: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});

export const updateCouponSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    description: z.string().optional(),
    discountValue: z.number().min(0).optional(),
    maxDiscount: z.number().min(0).optional(),
    minPurchaseAmount: z.number().min(0).optional(),
    usageLimit: z
      .object({
        total: z.number().min(1).optional(),
        perUser: z.number().min(1).optional(),
      })
      .optional(),
    validFrom: z.string().datetime().optional(),
    validUntil: z.string().datetime().optional(),
    status: z.enum(["active", "inactive", "expired", "exhausted"]).optional(),
  }),
});

export const validateCouponSchema = z.object({
  body: z.object({
    code: z.string().min(1),
    courseIds: z.array(z.string()).min(1),
    totalAmount: z.number().min(0),
  }),
});

export const getCouponsQuerySchema = z.object({
  query: z.object({
    type: z.string().optional(),
    status: z.string().optional(),
    search: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
