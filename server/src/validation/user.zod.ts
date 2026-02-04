import { z } from "zod";
import { UserRole } from "../@types/enums";

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().regex(emailRegex, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must have uppercase, lowercase, number and special character",
    ),
  role: z.nativeEnum(UserRole),

  avatarUrl: z.string().url().optional(),
  phone: z.string().min(6).max(20).optional(),
  address: z.string().min(2).max(200).optional(),
});

export const LoginUserSchema = z.object({
  email: z.string().regex(emailRegex, "Invalid email format"),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must have uppercase, lowercase, number and special character",
    ),
});

export const getMeSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().regex(emailRegex, "Invalid email format"),
  role: z.nativeEnum(UserRole),

  avatarUrl: z.string().url().optional(),
  phone: z.string().min(6).max(20).optional(),
  address: z.string().min(2).max(200).optional(),
});

export const changePasswordSchema = z.object({
  old: z
    .string()
    .regex(
      passwordRegex,
      "Old password must have uppercase, lowercase, number and special character",
    ),
  newPassword: z
    .string()
    .regex(
      passwordRegex,
      "New password must have uppercase, lowercase, number and special character",
    ),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  avatarUrl: z.string().url().optional(),
  phone: z.string().min(6).max(20).optional(),
  address: z.string().min(2).max(200).optional(),
  lastSeenAt: z.coerce.date().optional(),
  isBlocked: z.boolean().optional(),
});
