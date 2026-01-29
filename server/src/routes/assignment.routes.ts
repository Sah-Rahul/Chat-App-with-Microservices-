import { Router } from "express";
import {
  assignAssignmentToStudent,
  createAssignment,
  deleteAssignment,
  getAssignmentById, 
  getTeacherTasks,
  gradeAssignment,
  submitAssignment,
  updateAssignment,
} from "../controller/assignment.controller";
import { isTeacher } from "../middlewares/teacher.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";

const assignmentRoutes = Router();

assignmentRoutes.post("/create", isTeacher, createAssignment);

assignmentRoutes.put("/:id", isTeacher, updateAssignment);

assignmentRoutes.delete("/:id", isTeacher, deleteAssignment);

assignmentRoutes.post("/", isTeacher, assignAssignmentToStudent);

assignmentRoutes.get("/:id", isTeacher, getAssignmentById);

assignmentRoutes.get("/", isTeacher, getTeacherTasks);

assignmentRoutes.put("/grade/:id", isTeacher, gradeAssignment);

assignmentRoutes.put("/submit/:id", isAuthenticated, submitAssignment); 

export default assignmentRoutes;
