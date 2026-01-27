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

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me",isAuthenticated, myProfile);
authRouter.post("/logout", isAuthenticated, logOutUser);
authRouter.put("/update-profile", isAuthenticated, updateProfile);
authRouter.patch("/forgot-password", forgotPassword);
authRouter.put("/change-password", isAuthenticated, changePassword);

export default authRouter;
