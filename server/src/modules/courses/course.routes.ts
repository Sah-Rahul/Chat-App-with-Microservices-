import express from "express";
import * as courseController from "./course.controller";
import {
  createCourseSchema,
  updateCourseSchema,
  getCoursesQuerySchema,
} from "./course.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { UserRole } from "../users/user.enums";
import { authorize } from "../../middleware/authorized.middleware";

const courseRoutes = express.Router();

courseRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(createCourseSchema),
  courseController.createCourse,
);

courseRoutes.get(
  "/",
  validate(getCoursesQuerySchema),
  courseController.getAllCourses,
);

courseRoutes.get(
  "/instructor/:instructorId",
  courseController.getInstructorCourses,
);

courseRoutes.get(
  "/institute/:instituteId",
  courseController.getInstituteCourses,
);

courseRoutes.get("/:id", courseController.getCourseById);

courseRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(updateCourseSchema),
  courseController.updateCourse,
);

courseRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  courseController.deleteCourse,
);

courseRoutes.patch(
  "/:id/publish",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  courseController.publishCourse,
);

courseRoutes.patch(
  "/:id/unpublish",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  courseController.unpublishCourse,
);

courseRoutes.get(
  "/:id/statistics",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  courseController.getCourseStatistics,
);

courseRoutes.patch(
  "/:id/toggle-featured",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  courseController.toggleFeatured,
);

courseRoutes.patch(
  "/:id/toggle-bestseller",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  courseController.toggleBestseller,
);

export default courseRoutes;
