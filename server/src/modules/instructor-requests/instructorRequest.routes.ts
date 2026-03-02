import express from "express";
import * as instructorRequestController from "./instructorRequest.controller";
import { 
  updateInstructorRequestSchema,
  reviewInstructorRequestSchema,
  RegisterInstructorSchema,
  LoginInstructorSchema, 
} from "./instructorRequest.zod";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { UserRole } from "../users/user.enums";
import { upload } from "../../config/multer.config";

const InstructorRequestRoutes = express.Router();

InstructorRequestRoutes.use(isAuthenticated);

InstructorRequestRoutes.post(
  "/register",
  validate(RegisterInstructorSchema),
  instructorRequestController.RegisterAsInstructor,
);

InstructorRequestRoutes.post(
  "/login",
  validate(LoginInstructorSchema),
  instructorRequestController.loginAsInstructor,
);

InstructorRequestRoutes.post(
  "/create",
  upload.array("documents"),
  instructorRequestController.createInstructorRequest,
);

InstructorRequestRoutes.get(
  "/",
  authorize(
    UserRole.INSTITUTE_ADMIN,
    UserRole.INSTRUCTOR,
    UserRole.SUPER_ADMIN,
  ),
  instructorRequestController.getAllInstructorRequests,
);

InstructorRequestRoutes.get(
  "/my-request",
  instructorRequestController.getMyInstructorRequest,
);

InstructorRequestRoutes.get(
  "/:id",
  instructorRequestController.getInstructorRequestById,
);

InstructorRequestRoutes.put(
  "/:id",
  validate(updateInstructorRequestSchema),
  instructorRequestController.updateInstructorRequest,
);

InstructorRequestRoutes.delete(
  "/:id",
  instructorRequestController.deleteInstructorRequest,
);

InstructorRequestRoutes.post(
  "/:id/review",
  authorize(UserRole.INSTITUTE_ADMIN, UserRole.SUPER_ADMIN),
  validate(reviewInstructorRequestSchema),
  instructorRequestController.reviewInstructorRequest,
);

export default InstructorRequestRoutes;
