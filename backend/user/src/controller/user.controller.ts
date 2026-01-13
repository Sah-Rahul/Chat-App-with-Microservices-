import type { Request, Response } from "express";
import Trycatch from "../config/Trycatch.js";
import { redisClient } from "../index.js";
import { publishToQueue } from "../config/rabbitmq.js";
import User from "../model/user.model.js";
import { sendToken } from "../config/sendToken.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const loginUser = Trycatch(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const rateLimitKey = `otp:ratelimit:${email}`;
  const otpKey = `otp:${email}`;

  const rateLimit = await redisClient.get(rateLimitKey);
  if (rateLimit) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redisClient.set(otpKey, otp, {
    EX: 300, // 5 minutes
  });

  await redisClient.set(rateLimitKey, "1", {
    EX: 60, // 1 minute
  });

  await publishToQueue("send_otp", {
    to: email,
    subject: "Your OTP code",
    body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });

  return res.status(200).json({
    message: "OTP sent successfully",
  });
});

export const verifyUser = Trycatch(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Email and OTP are required",
    });
  }

  const otpKey = `otp:${email}`;

  const storedOtp = await redisClient.get(otpKey);

  if (!storedOtp) {
    return res.status(400).json({
      message: "OTP expired or invalid",
    });
  }

  if (storedOtp !== otp) {
    return res.status(401).json({
      message: "Invalid OTP",
    });
  }

  await redisClient.del(otpKey);

  let user = await User.findOne({ email });

  if (!user) {
    const name = email.split("@")[0].slice(0, 8);

    user = await User.create({
      email,
      name,
    });
  }

  const token = sendToken(user);
  return res.status(200).json({
    message: "OTP verified successfully",
    user,
    token,
  });
});

export const myProfile = Trycatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = req.user;

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  }
);

export const updateProfile = Trycatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    const token = sendToken(updatedUser);

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      token,
    });
  }
);

export const getAllUsers = Trycatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const users = await User.find().select("-password");

    return res.status(200).json({
      message: "All users fetched successfully",
      users,
    });
  }
);

export const getUserById = Trycatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  }
);
