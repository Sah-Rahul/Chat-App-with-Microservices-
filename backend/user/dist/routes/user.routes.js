import { Router } from "express";
import { getAllUsers, getUserById, loginUser, myProfile, updateProfile, verifyUser } from "../controller/user.controller.js";
import { isauth } from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.post("/login", loginUser);
userRouter.post("/verify", verifyUser);
userRouter.get("/me", isauth, myProfile);
userRouter.get("/allusers", isauth, getAllUsers);
userRouter.get("/user/:id", isauth, getUserById);
userRouter.put("/update-profile", isauth, updateProfile);
export default userRouter;
//# sourceMappingURL=user.routes.js.map