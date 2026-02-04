import { Router } from "express";
import {
  register,
  login,
  getMe,
  changePassword,
  logout,
  refreshToken,
} from "../controller/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import {
  changePasswordSchema,
  CreateUserSchema,
  LoginUserSchema,
} from "../validation/user.zod";

const router = Router();

router.post("/register", validateRequest(CreateUserSchema), register);
router.post("/login", validateRequest(LoginUserSchema), login);
router.post("/refresh", refreshToken);

router.get("/me", isAuthenticated, getMe);
router.patch(
  "/change-password",
  isAuthenticated,
  validateRequest(changePasswordSchema),
  changePassword,
);
router.post("/logout", isAuthenticated, logout);

export default router;
