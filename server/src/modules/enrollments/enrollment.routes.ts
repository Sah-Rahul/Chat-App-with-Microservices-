import express from "express";
import * as enrollmentController from "./enrollment.controller"; 
import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
  getEnrollmentsQuerySchema,
  getEnrollmentByIdSchema,
} from "./enrollment.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const enrollmentRoutes = express.Router();

enrollmentRoutes.post(
  "/",
  isAuthenticated,
  validate(createEnrollmentSchema),
  enrollmentController.createEnrollment,
);

enrollmentRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getEnrollmentsQuerySchema),
  enrollmentController.getAllEnrollments,
);

enrollmentRoutes.get(
  "/my-enrollments",
  isAuthenticated,
  enrollmentController.getMyEnrollments,
);

enrollmentRoutes.get(
  "/course/:courseId",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  enrollmentController.getCourseEnrollments,
);

enrollmentRoutes.get(
  "/:id",
  isAuthenticated,
  validate(getEnrollmentByIdSchema),
  enrollmentController.getEnrollmentById,
);

enrollmentRoutes.put(
  "/:id",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(updateEnrollmentSchema),
  enrollmentController.updateEnrollment,
);

enrollmentRoutes.post(
  "/:id/revoke",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(getEnrollmentByIdSchema),
  enrollmentController.revokeEnrollment,
);

enrollmentRoutes.post(
  "/:id/extend",
  isAuthenticated,
    authorize(UserRole.INSTITUTE_ADMIN),
  validate(getEnrollmentByIdSchema),
  enrollmentController.extendEnrollment,
);

enrollmentRoutes.get(
  "/check/:courseId",
  isAuthenticated,
  enrollmentController.checkEnrollment,
);

enrollmentRoutes.get(
  "/statistics/overview",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  enrollmentController.getEnrollmentStatistics,
);

export default enrollmentRoutes;
