import { z } from "zod";

export const updateProgressSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
  body: z.object({
    sectionId: z.string().min(1),
    lectureId: z.string().min(1),
    watchedDuration: z.number().min(0),
    totalDuration: z.number().min(1),
  }),
});

export const markLectureCompleteSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
  body: z.object({
    sectionId: z.string().min(1),
    lectureId: z.string().min(1),
  }),
});

export const updateQuizScoreSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
  body: z.object({
    quizId: z.string().min(1),
    score: z.number().min(0),
    maxScore: z.number().min(1),
  }),
});

export const updateAssignmentScoreSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
  body: z.object({
    assignmentId: z.string().min(1),
    score: z.number().min(0),
    maxScore: z.number().min(1),
  }),
});

export const getProgressQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    courseId: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const getCourseProgressSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
  }),
});
