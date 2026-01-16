import Trycatch from "../config/Trycatch.js";
import type { AuthenticatedRequest } from "../middlewares/isAuth.middleware.js";
import Chat from "../model/chat.model.js";

export const createNewChat = Trycatch(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;
    const { otherUserId } = req.body;

    if (!otherUserId) {
      return res.status(400).json({
        message: "Other userId is required",
      });
    }
 
    const existingChat = await Chat.findOne({
      users: { $all: [userId, otherUserId], $size: 2 },
    });

    if (existingChat) {
      return res.status(200).json({
        message: "Chat already exists",
        chat: existingChat,
      });
    }
 
    const newChat = await Chat.create({
      users: [userId, otherUserId],
    });

    return res.status(201).json({
      message: "Chat created successfully",
      chat: newChat,
    });
  }
);
