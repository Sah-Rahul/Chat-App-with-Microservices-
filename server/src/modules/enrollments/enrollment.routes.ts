import express from "express";
import * as enrollmentController from "./enrollment.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";

const enrollmentRoutes = express.Router();

enrollmentRoutes.post(
  "/",
  isAuthenticated,
  enrollmentController.createEnrollment,
);

enrollmentRoutes.get(
  "/my",
  isAuthenticated,
  enrollmentController.getMyEnrollments,
);

enrollmentRoutes.get(
  "/check/:courseId",
  isAuthenticated,
  enrollmentController.checkEnrollment,
);

enrollmentRoutes.put(
  "/progress/:courseId",
  isAuthenticated,
  enrollmentController.updateEnrollment,
);
export default enrollmentRoutes;
