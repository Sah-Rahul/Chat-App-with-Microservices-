import axios from "axios";
import Trycatch from "../config/Trycatch.js";
import type { AuthenticatedRequest } from "../middlewares/isAuth.middleware.js";
import Chat from "../model/chat.model.js";
import messageModal from "../model/message.model.js";

export const createNewChat = Trycatch(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;
    const { otherUserId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!otherUserId) {
      return res.status(400).json({
        message: "Other userId is required",
      });
    }

    if (userId.toString() === otherUserId.toString()) {
      return res.status(400).json({
        message: "You cannot create a chat with yourself",
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
      users: [userId.toString(), otherUserId.toString()],
    });

    return res.status(201).json({
      message: "Chat created successfully",
      chat: newChat,
    });
  },
);

export const getAllChat = Trycatch(async (req: AuthenticatedRequest, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  const chats = await Chat.find({
    users: userId.toString(),
  }).sort({ updatedAt: -1 });

  const chatWithUserData = await Promise.all(
    chats.map(async (chat) => {
      const otherUserId = chat.users.find((id) => id !== userId.toString());

      if (!otherUserId) {
        return null;
      }

      const unseenCount = await messageModal.countDocuments({
        chatId: chat._id,
        sender: { $ne: userId },
        seen: false,
      });

      try {
        const { data } = await axios.get(
          `${process.env.USER_SERVICES}/api/v1/user/${otherUserId}`,
        );

        return {
          user: data.user,
          chat: {
            ...chat.toObject(),
            latestMessage: chat.latestMessage || null,
            unseenCount,
          },
        };
      } catch (error) {
        return {
          user: {
            _id: otherUserId,
            name: "Unknown User",
          },
          chat: {
            ...chat.toObject(),
            latestMessage: chat.latestMessage || null,
            unseenCount,
          },
        };
      }
    }),
  );

  const filteredChats = chatWithUserData.filter(Boolean);

  return res.status(200).json({
    message: "Chats fetched successfully",
    chats: filteredChats,
    userId,
  });
});

export const sendImageMessage = Trycatch(
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;
    const { chatId, text } = req.body;
    const file = req.file;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }

    if (!file && !text) {
      return res.status(400).json({
        message: "Either text or image is required",
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.users.includes(userId.toString())) {
      return res.status(403).json({ message: "You are not in this chat" });
    }

    const messageData: any = {
      chatId,
      sender: userId.toString(),
      text: text || "",
      seen: false,
    };

    if (file) {
      messageData.image = file.path;
    }

    const message = await messageModal.create(messageData);

    chat.latestMessage = {
      text: text || "Sent an image",
      sender: userId.toString(),
    };
    await chat.save();

    return res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  },
);

 
