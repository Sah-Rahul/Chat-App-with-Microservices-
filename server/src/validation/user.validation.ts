import { z } from 'zod';
import {
  AccountStatusEnum,
  BlockReasonEnum,
  GenderEnum,
  UserRoleEnum,
} from '../enums/enums';

 
export const BlockStatusSchema = z.object({
  isBlocked: z.boolean(),
  reason: BlockReasonEnum.optional(),
  blockedAt: z.date().optional(),
  blockedTill: z.date().optional(),
  blockedBy: z.string().optional(),
  remarks: z.string().optional(),
});

 
export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),

  phone: z.string().min(10).max(15).optional(),
  address: z.string().optional(),
  gender: GenderEnum.optional(),

  isActive: z.boolean().optional(),
  accountStatus: AccountStatusEnum.optional(),
  blockStatus: BlockStatusSchema.optional(),
});

 
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
 
export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).max(15).optional(),
  address: z.string().optional(),
  profilePicture: z.string().url().optional(),
  gender: GenderEnum.optional(),
});

 
export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

 
export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

 
export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

 
export const BlockUserSchema = z.object({
  isBlocked: z.boolean(),
  reason: BlockReasonEnum.optional(),
  blockedTill: z.date().optional(),
  remarks: z.string().optional(),
});
