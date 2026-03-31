import express from "express";
import * as authController from "./auth.controller";
import {
  registerSchema,
  loginSchema, 
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  changePasswordSchema,
} from "./auth.zod";
import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";

const authRoutes = express.Router();

authRoutes.post("/register", validate(registerSchema), authController.register);

authRoutes.post("/login", validate(loginSchema), authController.login);

authRoutes.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);

authRoutes.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword,
);

authRoutes.post(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyEmail,
);

authRoutes.post("/logout", isAuthenticated, authController.logout);

authRoutes.post(
  "/change-password",
  isAuthenticated,
  validate(changePasswordSchema),
  authController.changePassword,
);

export default authRoutes;
