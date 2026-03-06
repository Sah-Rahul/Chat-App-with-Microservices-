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
import { upload } from "../../config/multer.config";

const courseRoutes = express.Router();

courseRoutes.get(
  "/",
  validate(getCoursesQuerySchema),
  courseController.getAllCourses,
);

courseRoutes.get(
  "/instructor/:instructorId",
  courseController.getInstructorCourses,
);

courseRoutes.get("/:id", courseController.getCourseById);

courseRoutes.post(
  "/create",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.SUPER_ADMIN),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "previewVideo", maxCount: 1 },
  ]),
  validate(createCourseSchema),
  courseController.createCourse,
);

courseRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.SUPER_ADMIN),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "previewVideo", maxCount: 1 },
  ]),
  validate(updateCourseSchema),
  courseController.updateCourse,
);

courseRoutes.delete(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.SUPER_ADMIN),
  courseController.deleteCourse,
);

courseRoutes.patch(
  "/:id/publish",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.SUPER_ADMIN),
  courseController.publishCourse,
);

courseRoutes.patch(
  "/:id/unpublish",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.SUPER_ADMIN),
  courseController.unpublishCourse,
);

courseRoutes.get(
  "/:id/statistics",
  isAuthenticated,
  authorize(UserRole.INSTRUCTOR, UserRole.SUPER_ADMIN),
  courseController.getCourseStatistics,
);

courseRoutes.patch(
  "/:id/toggle-featured",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  courseController.toggleFeatured,
);

courseRoutes.patch(
  "/:id/toggle-bestseller",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN),
  courseController.toggleBestseller,
);

courseRoutes.get("/course/:slug", courseController.getCourseBySlug);

export default courseRoutes;
