import { z } from "zod";

export const createCourseSchema = z.object({
 title: z.string().min(10).max(100),
    subtitle: z.string().max(200).optional(),
    description: z.string().min(100).max(5000),
    thumbnail: z.string().url(),
    previewVideo: z.string().url().optional(),
    price: z.number().min(0),
    discountedPrice: z.number().min(0).optional(),
    level: z.enum(["beginner", "intermediate", "advanced", "all_levels"]),
    language: z.enum([
      "english",
      "hindi",
      "spanish",
      "french",
      "german",
      "chinese",
    ]),
    categoryId: z.string().min(1),
    instituteId: z.string().min(1),
    curriculum: z
      .array(
        z.object({
          sectionTitle: z.string(),
          sectionOrder: z.number(),
          lectures: z.array(
            z.object({
              lectureTitle: z.string(),
              lectureOrder: z.number(),
              videoUrl: z.string().url().optional(),
              videoDuration: z.number().optional(),
              content: z.string().optional(),
              resources: z
                .array(
                  z.object({
                    title: z.string(),
                    url: z.string().url(),
                    type: z.string(),
                  }),
                )
                .optional(),
              isFree: z.boolean(),
            }),
          ),
        }),
      )
      .min(1),
    learningOutcomes: z.array(z.string()).min(1),
    prerequisites: z.array(z.string()),
    requirements: z.array(z.string()),
    tags: z.array(z.string()),
    certificateEnabled: z.boolean(),
});

export const updateCourseSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(10).max(100).optional(),
    subtitle: z.string().max(200).optional(),
    description: z.string().min(100).max(5000).optional(),
    thumbnail: z.string().url().optional(),
    previewVideo: z.string().url().optional(),
    price: z.number().min(0).optional(),
    discountedPrice: z.number().min(0).optional(),
    level: z
      .enum(["beginner", "intermediate", "advanced", "all_levels"])
      .optional(),
    language: z
      .enum(["english", "hindi", "spanish", "french", "german", "chinese"])
      .optional(),
    categoryId: z.string().min(1).optional(),
    learningOutcomes: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    certificateEnabled: z.boolean().optional(),
  }),
});

export const getCoursesQuerySchema = z.object({
  query: z.object({
    categoryId: z.string().optional(),
    instituteId: z.string().optional(),
    instructorId: z.string().optional(),
    level: z.string().optional(),
    language: z.string().optional(),
    status: z.string().optional(),
    search: z.string().optional(),
    minPrice: z.string().transform(Number).optional(),
    maxPrice: z.string().transform(Number).optional(),
    isFeatured: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    isBestseller: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
