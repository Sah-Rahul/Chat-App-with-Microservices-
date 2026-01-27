import { Router } from "express";
import {
  addTeacher,
  addStaff,
  getAllTeacher,
  getAllStaff,
  getAllUsers,
  getUserById,
  blockUser,
  deleteUser,
  promoteTeacher,
  promoteStaff,
  adminRegister,
  adminLogin,
  adminLogout,
  adminMyProfile,
  getStaffById,
  getTeacherById,
} from "../controller/admin.controller";

import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { upload } from "../middlewares/multer.middleware";

const adminRoutes = Router();

adminRoutes.post("/register", adminRegister);
adminRoutes.post("/login", adminLogin);
adminRoutes.post("/logout", isAdmin, adminLogout);
adminRoutes.get("/me", isAdmin, adminMyProfile);

adminRoutes.post(
  "/add-teacher",
  isAdmin,
  upload.single("profilePicture"),
  addTeacher,
);


adminRoutes.patch(
  "/teacher/:id/promote",
  isAuthenticated,
  isAdmin,
  promoteTeacher,
);

adminRoutes.post(
  "/add-staff",
  isAdmin,
  upload.single("profilePicture"),
  addStaff,
);

adminRoutes.get("/staff", isAdmin, getAllStaff);

adminRoutes.get("/staff/:id", isAdmin, getStaffById);

adminRoutes.get("/users", isAdmin, getAllUsers);

adminRoutes.get("/users/:id", isAdmin, getUserById); 

adminRoutes.get("/teacher", isAdmin, getAllTeacher);

adminRoutes.get("/teacher/:id", isAdmin, getTeacherById);

adminRoutes.patch("/staff/:id/promote", isAdmin, promoteStaff);

adminRoutes.patch("/users/:id/block", isAdmin, blockUser);

adminRoutes.delete("/users/:id", isAdmin, deleteUser);

export default adminRoutes;
