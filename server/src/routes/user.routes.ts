import express from "express";
import {
  changePassword,
  forgotPassword,
  loginUser,
  logOutUser,
  myProfile,
  registerUser,
  updateProfile,
} from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { getStudentTasks } from "../controller/assignment.controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me",isAuthenticated, myProfile);
authRouter.post("/logout", isAuthenticated, logOutUser);
authRouter.put("/update-profile", isAuthenticated, upload.single("profileImage"), updateProfile);
authRouter.patch("/forgot-password", forgotPassword);
authRouter.put("/change-password", isAuthenticated, changePassword);
authRouter.get("/my-task", isAuthenticated, getStudentTasks);

export default authRouter;
