import { z } from "zod";

export const generateCertificateSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    courseId: z.string().min(1),
    enrollmentId: z.string().min(1),
  }),
});

export const getCertificatesQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    courseId: z.string().optional(),
    instituteId: z.string().optional(),
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

export const verifyCertificateSchema = z.object({
  params: z.object({
    certificateNumber: z.string().min(1),
  }),
});

export const shareCertificateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    platform: z.enum(["linkedin", "facebook", "twitter", "email", "other"]),
  }),
});
