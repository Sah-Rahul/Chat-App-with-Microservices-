import { z } from "zod";
import { ExpertiseLevel } from "./instructorRequest.enums";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/;

export const RegisterInstructorSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  email: z.string().regex(emailRegex, "Invalid email format"),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be 7-20 characters and include uppercase, lowercase, number, and special character",
    ),
});

export const LoginInstructorSchema = z.object({
  email: z.string().regex(emailRegex, "Invalid email format"),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be 7-20 characters and include uppercase, lowercase, number, and special character",
    ),
});

export const createInstructorRequestSchema = z.object({
  body: z.object({
    instituteId: z.string().optional(),
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^[0-9]{10,15}$/, "Phone must be 10-15 digits"),
    bio: z.string().min(10).max(2000),
    experienceYears: z.string(),
    expertiseLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),

    expertise: z.string().min(1),
    qualifications: z.string().min(1),
    workExperience: z.string().min(1),

    achievements: z.string().optional(),
    socialLinks: z.string().optional(),
    sampleContent: z.string().optional(),
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
  status: z.enum(["approved", "rejected"]),
  approvalNotes: z.string().optional(),
  rejectionReason: z.string().optional(),
});

 
