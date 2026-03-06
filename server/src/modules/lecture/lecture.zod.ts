import { z } from "zod";
import { ResourceType } from "./lecture.enums";
import { LECTURE_CONSTANTS } from "./lecture.constants";

const booleanField = z
  .any()
  .transform((val) => val === true || val === "true")
  .pipe(z.boolean());

const parseResources = (val: unknown) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed);
      } catch {}
    }
    if (trimmed.startsWith("{")) {
      try {
        return [JSON.parse(trimmed)];
      } catch {}
    }
  }
  return [];
};

const resourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url("Invalid resource URL"),
  type: z.nativeEnum(ResourceType),
});

export const createLectureSchema = z.object({
  courseId: z.string().min(1, "courseId is required"),

  sectionId: z.string().min(1, "sectionId is required"),

  title: z
    .string()
    .min(
      LECTURE_CONSTANTS.TITLE_MIN,
      `Title must be at least ${LECTURE_CONSTANTS.TITLE_MIN} characters`,
    )
    .max(LECTURE_CONSTANTS.TITLE_MAX),
  description: z.string().max(2000).optional(),
  isPreview: booleanField.optional().default(false),
  resources: z
    .any()
    .transform(parseResources)
    .pipe(z.array(resourceSchema).max(10))
    .optional()
    .default([]),
});

export const updateLectureSchema = z.object({
  title: z.string().min(3).max(150).optional(),
  description: z.string().max(2000).optional(),
  isPreview: booleanField.optional(),
  resources: z
    .any()
    .transform(parseResources)
    .pipe(z.array(resourceSchema).max(10))
    .optional(),
});

export const reorderLecturesSchema = z.object({
  lectures: z
    .array(
      z.object({
        lectureId: z.string().min(1),
        order: z.number().min(0),
      }),
    )
    .min(1),
});
