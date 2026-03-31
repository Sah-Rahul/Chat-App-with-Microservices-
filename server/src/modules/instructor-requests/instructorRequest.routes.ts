import express from "express";
import * as instructorRequestController from "./instructorRequest.controller";
import {
  createInstructorRequestSchema,
  updateInstructorRequestSchema,
  reviewInstructorRequestSchema,
  getInstructorRequestsQuerySchema,
} from "./instructorRequest.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";

const InstructorRequestRoutes = express.Router();

InstructorRequestRoutes.post(
  "/",
  isAuthenticated,
  validate(createInstructorRequestSchema),
  instructorRequestController.createInstructorRequest,
);

InstructorRequestRoutes.get(
  "/",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(getInstructorRequestsQuerySchema),
  instructorRequestController.getAllInstructorRequests,
);

InstructorRequestRoutes.get(
  "/my-request",
  isAuthenticated,
  instructorRequestController.getMyInstructorRequest,
);

InstructorRequestRoutes.get(
  "/:id",
  isAuthenticated,
  instructorRequestController.getInstructorRequestById,
);

InstructorRequestRoutes.put(
  "/:id",
  isAuthenticated,
  validate(updateInstructorRequestSchema),
  instructorRequestController.updateInstructorRequest,
);

InstructorRequestRoutes.delete(
  "/:id",
  isAuthenticated,
  instructorRequestController.deleteInstructorRequest,
);

InstructorRequestRoutes.post(
  "/:id/review",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  validate(reviewInstructorRequestSchema),
  instructorRequestController.reviewInstructorRequest,
);

InstructorRequestRoutes.post(
  "/:id/schedule-interview",
  isAuthenticated,
  authorize(UserRole.INSTITUTE_ADMIN),
  instructorRequestController.scheduleInterview,
);

export default InstructorRequestRoutes;
