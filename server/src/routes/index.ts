import { Router } from "express";
import authRouter from "./user.routes";
import adminRoutes from "./admin.routes";
import teacherRoutes from "./teacher.routes";
import assignmentRoutes from "./assignment.routes";

const appRoute = Router()

appRoute.use("/api/v1/auth",authRouter)
appRoute.use("/api/v1/admin",adminRoutes)
appRoute.use("/api/v1/teacher",teacherRoutes)
appRoute.use("/api/v1/assignment",assignmentRoutes)


export default appRoute