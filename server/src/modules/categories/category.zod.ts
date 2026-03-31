import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(50),
  image: z.string().url().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(50).optional(),
  image: z.string().url().optional(),
  status: z.enum(["active", "inactive", "deleted"]).optional(),
});

export const getCategoriesQuerySchema = z.object({
  parentId: z.string().optional(),
  level: z.string().transform(Number).optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const getCategoryByIdSchema = z.object({
  id: z.string().min(1),
});

export const getCategoryBySlugSchema = z.object({
  slug: z.string().min(1),
});
