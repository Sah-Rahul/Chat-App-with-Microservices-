import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  RegisterDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  VerifyEmailDTO,
  ChangePasswordDTO,
} from "./auth.dto";
import { AUTH_CONSTANTS, AUTH_MESSAGES } from "./auth.constants";
import { ApiError } from "../../utils/ApiError";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { UserStatus } from "../users/user.enums";
import { ApiResponse } from "../../utils/ApiResponse";
import UserModel from "../users/user.model";
import { setCache } from "../../utils/redis.utils";
import { sendToQueue } from "../../utils/rabbitmq.utils";
import { QUEUES } from "../../config/queues";
import { sendEmail } from "../../emailTemplates/sendEmail";
import { ForgotPasswordEmailTemplate } from "../../emailTemplates/ForgotPasswordEmailTemplate";
import { PasswordResetEmailTemplate } from "../../emailTemplates/PasswordResetemailtemplate";
 
export const registerService = async (data: RegisterDTO) => {
  const { firstName, lastName, email, password } = data;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, AUTH_MESSAGES.EMAIL_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    AUTH_CONSTANTS.PASSWORD_SALT_ROUNDS,
  );

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    isEmailVerified: false,
  });

  const emailVerificationToken = jwt.sign(
    { userId: user._id },
    process.env.EMAIL_VERIFICATION_SECRET!,
    { expiresIn: "15m" }, // 15 min
  );

  user.emailVerificationToken = emailVerificationToken;
  user.emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  await user.save();

  // await setCache(
  //   `user:${user._id}`,
  //   {
  //     _id: user._id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     role: user.role,
  //     status: user.status,
  //     isEmailVerified: user.isEmailVerified,
  //   },
  //   3600,
  // );

  // await sendToQueue("emailVerificationQueue", {
  //   userId: user._id,
  //   name: user.firstName,
  //   email: user.email,
  //   token: emailVerificationToken,
  // });

  return {
    message: AUTH_MESSAGES.REGISTER_SUCCESS,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    },
  };
};

export const loginService = async (data: LoginDTO) => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user)
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );

  if (user.status !== UserStatus.ACTIVE)
    throw new ApiError(HTTP_STATUS.FORBIDDEN, AUTH_MESSAGES.ACCOUNT_SUSPENDED);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );

  if (!user.isEmailVerified)
    throw new ApiError(HTTP_STATUS.FORBIDDEN, AUTH_MESSAGES.EMAIL_NOT_VERIFIED);

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY },
  );

  if (!user.isWelcomeEmailSent) {
    await sendToQueue(QUEUES.WELCOME, {
      email: user.email,
      userName: user.firstName,
    });

    user.isWelcomeEmailSent = true;
    await user.save();
  }

  return {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutService = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, {
    $unset: { refreshToken: 1 },
  });

  return {
    message: AUTH_MESSAGES.LOGOUT_SUCCESS,
  };
};

export const forgotPasswordService = async (data: ForgotPasswordDTO) => {
  const { email } = data;

  if (!email) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email is required");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return new ApiResponse(
      HTTP_STATUS.OK,
      null,
      "If this email exists, a password reset link has been sent",
    );
  }

  const resetToken = jwt.sign(
    { userId: user._id },
    process.env.PASSWORD_RESET_SECRET!,
    { expiresIn: "1h" },
  );

  user.passwordResetToken = resetToken;
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const resetUrl = `${process.env.CLIENT}/reset-password?token=${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "Reset Your Password - Educate LMS",
    html: ForgotPasswordEmailTemplate(user.firstName, resetUrl),
  });

  return new ApiResponse(
    HTTP_STATUS.OK,
    null,
    AUTH_MESSAGES.PASSWORD_RESET_SENT,
  );
};

export const resetPasswordService = async (data: ResetPasswordDTO) => {
  const { token, newPassword } = data;

  if (!token || !newPassword) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Token and new password are required",
    );
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET!);
  } catch {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Invalid or expired reset token",
    );
  }

  const user = await UserModel.findOne({
    _id: decoded.userId,
    passwordResetToken: token,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Invalid or expired reset token",
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    AUTH_CONSTANTS.PASSWORD_SALT_ROUNDS,
  );

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Your Password Has Been Changed - Educate LMS",
    html: PasswordResetEmailTemplate(user.firstName),
  });

  return new ApiResponse(
    HTTP_STATUS.OK,
    null,
    AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
  );
};

export const verifyEmailService = async (data: VerifyEmailDTO) => {
  const { token } = data;

  if (!token) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Verification token is required",
    );
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET!);
  } catch (err) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid or expired token");
  }

  const user = await UserModel.findOne({
    _id: decoded.userId,
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid or expired token");
  }

  user.isEmailVerified = true;

  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  // 5️⃣ Optional: Send welcome email
  // await sendEmail({ to: user.email, template: "welcome" });

  return new ApiResponse(HTTP_STATUS.OK, null, AUTH_MESSAGES.EMAIL_VERIFIED);
};

export const changePasswordService = async (
  userId: string,
  data: ChangePasswordDTO,
) => {
  const { currentPassword, newPassword } = data;

  const user = await UserModel.findById(userId).select("+password");
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      AUTH_MESSAGES.INCORRECT_PASSWORD,
    );
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.SAME_PASSWORD);
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    AUTH_CONSTANTS.PASSWORD_SALT_ROUNDS,
  );

  user.password = hashedPassword;
  await user.save();

  return new ApiResponse(HTTP_STATUS.OK, null, AUTH_MESSAGES.PASSWORD_CHANGED);
};
