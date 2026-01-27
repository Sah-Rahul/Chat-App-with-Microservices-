import z from "zod";

export const UserRoleEnum = z.enum([
  'admin',
  'student',
  'teacher',
  'staff',
]);

export const GenderEnum = z.enum([
  'male',
  'female',
  'other',
]);

export const AccountStatusEnum = z.enum([
  'active',
  'blocked',
  'suspended',
]);

export const BlockReasonEnum = z.enum([
  'low_attendance',
  'fee_overdue',
  'book_overdue',
  'disciplinary',
  'other',
]);
