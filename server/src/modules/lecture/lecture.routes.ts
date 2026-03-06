import express from "express";
import * as lectureController from "./lecture.controller";
import { validate } from "../../middleware/validate.middleware";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorized.middleware";
import { upload } from "../../config/multer.config";
import { UserRole } from "../users/user.enums";
import { createLectureSchema, updateLectureSchema } from "./lecture.zod";

const lectureRoutes = express.Router();

lectureRoutes.get("/course/:courseId", lectureController.getLecturesByCourse);
lectureRoutes.get("/:lectureId", lectureController.getLectureById);

lectureRoutes.post(
  "/",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  upload.single("video"),
  validate(createLectureSchema),
  lectureController.createLecture,
);

lectureRoutes.put(
  "/:lectureId",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  upload.single("video"),
  validate(updateLectureSchema),
  lectureController.updateLecture,
);

lectureRoutes.delete(
  "/:lectureId",
  isAuthenticated,
  authorize(UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN),
  lectureController.deleteLecture,
);

export default lectureRoutes;
