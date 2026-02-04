import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import {
  ChangePasswordDto,
  LoginDto,
  MyProfileDto,
  RegisterDto,
} from "../dto/register.dto";
import jwt from "jsonwebtoken";

export const authService = {
  register: async (payload: RegisterDto) => {
    const { name, email, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
  },

  login: async (payload: LoginDto) => {
    const { email, password } = payload;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  },

  myProfile: async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new ApiError(404, "User not found");
    return user;
  },

  changePassword: async (userId: string, payload: ChangePasswordDto) => {
    const { oldPassword, newPassword } = payload;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isOldCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldCorrect) {
      throw new ApiError(400, "Old password incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: "Password changed successfully" };
  },

  generateTokens: (userId: string) => {
    const accessToken = jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  },
};
