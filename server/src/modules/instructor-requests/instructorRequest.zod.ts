import { z } from "zod";

export const createInstructorRequestSchema = z.object({
  body: z.object({
    instituteId: z.string().optional(),
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    phone: z.string().min(10),
    bio: z.string().min(100).max(2000),
    expertise: z.array(z.string()).min(1),
    experienceYears: z.number().min(0),
    expertiseLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    qualifications: z
      .array(
        z.object({
          degree: z.string(),
          institution: z.string(),
          year: z.number(),
          field: z.string(),
        }),
      )
      .min(1),
    workExperience: z.array(
      z.object({
        designation: z.string(),
        company: z.string(),
        from: z.string().datetime(),
        to: z.string().datetime().optional(),
        current: z.boolean(),
        description: z.string().optional(),
      }),
    ),
    achievements: z.array(z.string()).optional(),
    socialLinks: z
      .object({
        linkedin: z.string().url().optional(),
        youtube: z.string().url().optional(),
        github: z.string().url().optional(),
        portfolio: z.string().url().optional(),
        other: z.string().url().optional(),
      })
      .optional(),
    sampleContent: z
      .array(
        z.object({
          type: z.enum(["video", "article", "project"]),
          title: z.string(),
          url: z.string().url(),
        }),
      )
      .optional(),
    documents: z
      .array(
        z.object({
          type: z.string(),
          name: z.string(),
          url: z.string().url(),
        }),
      )
      .min(1),
  }),
});

export const updateInstructorRequestSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    fullName: z.string().min(3).max(100).optional(),
    phone: z.string().min(10).optional(),
    bio: z.string().min(100).max(2000).optional(),
    expertise: z.array(z.string()).min(1).optional(),
    experienceYears: z.number().min(0).optional(),
    expertiseLevel: z
      .enum(["beginner", "intermediate", "advanced", "expert"])
      .optional(),
  }),
});

export const reviewInstructorRequestSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    status: z.enum(["approved", "rejected"]),
    approvalNotes: z.string().optional(),
    rejectionReason: z.string().optional(),
  }),
});

export const getInstructorRequestsQuerySchema = z.object({
  query: z.object({
    status: z.string().optional(),
    instituteId: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
