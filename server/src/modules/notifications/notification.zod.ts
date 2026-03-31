import { z } from "zod";

const priorityEnum = z.enum(["low", "medium", "high", "urgent"]);

const channelsSchema = z
  .object({
    inApp: z.boolean().default(false),
    email: z.boolean().default(false),
    sms: z.boolean().default(false),
    push: z.boolean().default(false),
  })
  .refine((data) => Object.values(data).some((val) => val === true), {
    message: "At least one notification channel must be enabled",
  });

export const createNotificationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    type: z.string().min(1, "Type is required"),
    priority: priorityEnum,
    title: z.string().min(1).max(100),
    message: z.string().min(1).max(500),
    imageUrl: z.string().url().optional(),
    actionUrl: z.string().url().optional(),
    actionText: z.string().optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    channels: channelsSchema,
  }),
});

export const sendBulkNotificationSchema = z.object({
  body: z.object({
    userIds: z.array(z.string().min(1)).min(1, "At least one userId required"),
    type: z.string().min(1),
    priority: priorityEnum,
    title: z.string().min(1).max(100),
    message: z.string().min(1).max(500),
    imageUrl: z.string().url().optional(),
    actionUrl: z.string().url().optional(),
    actionText: z.string().optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    channels: channelsSchema,
  }),
});

export const getNotificationsQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
    type: z.string().optional(),
    priority: priorityEnum.optional(),
    status: z.string().optional(),

    isRead: z
      .string()
      .optional()
      .transform((val) => (val === undefined ? undefined : val === "true")),

    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1)),

    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 10)),

    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const markAsReadSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Notification ID is required"),
  }),
});
