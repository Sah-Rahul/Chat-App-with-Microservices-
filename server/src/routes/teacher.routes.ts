import { Router } from "express";
import { changeTeacherPassword, loginTeacher, logoutTeacher, teacherProfile, updateTeacherProfile } from "../controller/teacher.controller";
import { isTeacher } from "../middlewares/teacher.middleware";
import { upload } from "../middlewares/multer.middleware";

const teacherRoutes = Router()

teacherRoutes.post("/login", loginTeacher)
teacherRoutes.post("/logout",isTeacher, logoutTeacher)
teacherRoutes.get("/profile",isTeacher, teacherProfile)
teacherRoutes.patch("/change-password",isTeacher, changeTeacherPassword)
teacherRoutes.put("/update-profile",isTeacher, upload.single("profilePicture"), updateTeacherProfile)

export default teacherRoutes