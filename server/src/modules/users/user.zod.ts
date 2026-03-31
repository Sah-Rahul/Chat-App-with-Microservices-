import { z } from "zod";
import { Gender } from "./user.enums";

export const updateUserSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/)
    .optional(),
  avatar: z.string().url().optional(),
  gender: z
    .enum([Gender.MALE, Gender.FEMALE, Gender.OTHER, Gender.PREFER_NOT_TO_SAY])
    .optional(),
  dateOfBirth: z.string().datetime().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),
});

export const getUsersQuerySchema = z.object({
  query: z.object({
    role: z.string().optional(),
    status: z.string().optional(),
    search: z.string().optional(),
    isEmailVerified: z
      .string()
      .transform((val) => val === "true")
      .optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const getUserByIdSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});

export const suspendUserSchema = z.object({ 
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});
