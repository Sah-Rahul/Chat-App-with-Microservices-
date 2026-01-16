import { Router } from "express";
import { createNewChat } from "../controller/chat.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";

const chatRouter = Router()

chatRouter.post("/new",isAuth, createNewChat)

export default chatRouter