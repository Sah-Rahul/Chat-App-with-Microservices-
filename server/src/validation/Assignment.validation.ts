import { z } from "zod";
import {
  AssignmentPriority,
  AssignmentStatus,
} from "../models/assignment.model";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const CreateTaskSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(5).max(2000),
  assignedTo: objectId.optional(),
  deadLine: z.coerce.date(),
  priority: z.nativeEnum(AssignmentPriority).optional(),
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().min(5).max(2000).optional(),
  assignedTo: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  status: z.nativeEnum(AssignmentStatus).optional(),
  priority: z.nativeEnum(AssignmentPriority).optional(),
  attachments: z
    .array(
      z.object({
        url: z.string().url(),
        public_id: z.string(),
      }),
    )
    .optional(),
});

export const DeleteTaskSchema = z.object({
  taskId: objectId,
});

export const SubmitTaskSchema = z.object({
  submissionText: z.string().min(1).max(5000).optional(),
  status: z.enum([
    AssignmentStatus.IN_PROGRESS,
    AssignmentStatus.COMPLETED,
    AssignmentStatus.CANCELLED
  ]),
});


export const GradeTaskSchema = z.object({
  marks: z.number().min(0),
  totalMarks: z.number().min(1),
  feedback: z.string().max(1000).optional(),
});

export const GetStudentTasksSchema = z.object({
  status: z.nativeEnum(AssignmentStatus).optional(),
  subject: objectId.optional(),
  priority: z.nativeEnum(AssignmentPriority).optional(),
});

export const GetTeacherTasksSchema = z.object({
  status: z.nativeEnum(AssignmentStatus).optional(),
  subject: objectId.optional(),
  priority: z.nativeEnum(AssignmentPriority).optional(),
});

export const GetTaskByIdSchema = z.object({
  taskId: objectId,
});
