import express from "express";
import * as userController from "./user.controller";
import {
  updateUserSchema,
  getUsersQuerySchema,
  getUserByIdSchema,
  suspendUserSchema,
} from "./user.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "./user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const userRoutes = express.Router();

userRoutes.get("/profile", isAuthenticated, userController.getProfile);

userRoutes.put(
  "/update/profile",
  isAuthenticated,
  validate(updateUserSchema),
  userController.updateProfile,
);

userRoutes.get(
  "/profile/statistics",
  isAuthenticated,
  userController.getMyStatistics,
);

userRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  // validate(getUsersQuerySchema),
  userController.getAllUsers,
);

userRoutes.get(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  userController.getUserById,
);

userRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getUserByIdSchema),
  userController.deleteUser,
);

userRoutes.patch(
  "/:id/suspend",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(suspendUserSchema),
  userController.suspendUser,
);

userRoutes.patch(
  "/:id/activate",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  userController.activateUser,
);

userRoutes.get(
  "/:id/statistics",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(getUserByIdSchema),
  userController.getUserStatistics,
);

export default userRoutes;
