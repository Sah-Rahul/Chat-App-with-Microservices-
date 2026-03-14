import { z } from "zod";
import { classDay, CourseLevel } from "./course.enums";

const toStringArray = (val: unknown): string[] => {
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
      } catch {}
    }
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const toEnumArray =
  <T extends string>(enumObj: Record<string, T>) =>
  (val: unknown): T[] => {
    const arr = toStringArray(val);
    return arr.filter((v) => Object.values(enumObj).includes(v as T)) as T[];
  };

const parseCurriculum = (val: unknown) => {
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

const arrayField = z
  .any()
  .transform(toStringArray)
  .pipe(z.array(z.string()))
  .optional()
  .default([]);

const requiredArrayField = z
  .any()
  .transform(toStringArray)
  .pipe(z.array(z.string()).min(1, "At least one value required"));

const booleanField = z
  .any()
  .transform((val) => val === true || val === "true")
  .pipe(z.boolean());

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be at most 100 characters")
    .nonempty("Title is required"),

  subtitle: z.string().max(200).optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description too long")
    .nonempty("Description is required"),

  price: z.coerce.number().min(0, "Price cannot be negative"),

  discountPercentage: z.coerce.number().min(0).max(100).optional().default(0),

  level: z.nativeEnum(CourseLevel),
  language: z.literal("english"),
  categoryId: z.string().min(1, "categoryId is required"),

  learningOutcomes: requiredArrayField,
  prerequisites: arrayField,
  tags: arrayField,

  certificateEnabled: booleanField.optional().default(false),

  classDay: z
    .any()
    .transform(toEnumArray(classDay))
    .pipe(z.array(z.nativeEnum(classDay)))
    .optional()
    .default([classDay.SUNDAY]),

  startDate: z.string().optional(),

  curriculum: z
    .any()
    .transform(parseCurriculum)
    .pipe(
      z.array(
        z.object({
          title: z.string().min(1),
          lectures: z.array(z.string()).optional().default([]),
        }),
      ),
    )
    .optional()
    .default([]),
});

export const updateCourseSchema = createCourseSchema.partial();

export const getCoursesQuerySchema = z.object({
  categoryId: z.string().optional(),
  instructorId: z.string().optional(),

  level: z.nativeEnum(CourseLevel).optional(),
  language: z.literal("english"),

  status: z.string().optional(),
  search: z.string().optional(),

  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),

  isFeatured: z.coerce.boolean().optional(),
  isBestseller: z.coerce.boolean().optional(),

  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),

  sortBy: z
    .enum(["price", "rating", "totalEnrollments", "createdAt"])
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
