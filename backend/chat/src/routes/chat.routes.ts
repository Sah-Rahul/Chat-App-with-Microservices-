import { Router } from "express";
import { createNewChat, getAllChat, sendImageMessage } from "../controller/chat.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const chatRouter = Router()

chatRouter.post("/new",isAuth, createNewChat)
chatRouter.get("/all", isAuth, getAllChat);
chatRouter.post("/send", isAuth, upload.single("image"), sendImageMessage);

export default chatRouter