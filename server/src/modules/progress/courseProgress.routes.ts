import express from "express";
import * as progressController from "./courseProgress.controller";
import {
  updateProgressSchema,
  markLectureCompleteSchema,
  getProgressQuerySchema,
  getCourseProgressSchema,
} from "./courseProgress.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const courseProgressRoutes = express.Router();

courseProgressRoutes.use(isAuthenticated)
courseProgressRoutes.use(UserRole.STUDENT)

courseProgressRoutes.post(
  "/:courseId/update", 
  validate(updateProgressSchema),
  progressController.updateProgress,
);

courseProgressRoutes.post(
  "/:courseId/complete-lecture", 
  validate(markLectureCompleteSchema),
  progressController.markLectureComplete,
);

courseProgressRoutes.get(
  "/:courseId", 
  validate(getCourseProgressSchema),
  progressController.getCourseProgress,
);

courseProgressRoutes.get(
  "/", 
  validate(getProgressQuerySchema),
  progressController.getAllProgress,
);

courseProgressRoutes.delete(
  "/:courseId/reset", 
  validate(getCourseProgressSchema),
  progressController.resetProgress,
);

export default courseProgressRoutes;
