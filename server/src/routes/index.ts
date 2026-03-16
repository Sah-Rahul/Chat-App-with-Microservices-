import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes"; 
import wishlistRoutes from "../modules/wishlist/wishlist.routes";
import categoryRoutes from "../modules/categories/category.routes"; 
import InstructorRequestRoutes from "../modules/instructor-requests/instructorRequest.routes";
import courseRoutes from "../modules/courses/course.routes";
import reviewRoutes from "../modules/reviews/review.routes";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/user", userRoutes);
appRoutes.use("/category", categoryRoutes); 
appRoutes.use("/course", courseRoutes); 
appRoutes.use("/instructor", InstructorRequestRoutes); 
// appRoutes.use("/payment", paymentRoutes);
// appRoutes.use("/course-progress", courseProgressRoutes);
appRoutes.use("/review", reviewRoutes);
// appRoutes.use("/wishlist", wishlistRoutes);

export default appRoutes;
