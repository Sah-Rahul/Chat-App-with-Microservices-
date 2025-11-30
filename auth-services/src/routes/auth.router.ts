import express from "express";
import { signup, login, logout, refreshToken } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/refresh-token", refreshToken);

export default authRoutes;