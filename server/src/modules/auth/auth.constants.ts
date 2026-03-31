export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: "15m" as "15m",
  REFRESH_TOKEN_EXPIRY: "7d" as "7d",
  EMAIL_VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000,
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000,
  MAX_LOGIN_ATTEMPTS: 5,
  ACCOUNT_LOCK_TIME: 15 * 60 * 1000,
  PASSWORD_SALT_ROUNDS: 10,
};



export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: "Registration successful. Please verify your email.",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  EMAIL_VERIFIED: "Email verified successfully",
  EMAIL_ALREADY_VERIFIED: "Email is already verified",
  VERIFICATION_SENT: "Verification email sent successfully",
  PASSWORD_RESET_SENT: "Password reset link sent to your email",
  PASSWORD_RESET_SUCCESS: "Password reset successful",
  PASSWORD_CHANGED: "Password changed successfully",
  TOKEN_REFRESHED: "Token refreshed successfully",

  // Errors
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "Email already registered",
  EMAIL_DOESNOT_EXISTS: "Email doesn't exit",
  PHONE_EXISTS: "Phone number already registered",
  USER_NOT_FOUND: "User not found",
  INVALID_TOKEN: "Invalid or expired token",
  ACCOUNT_SUSPENDED: "Your account has been suspended",
  EMAIL_NOT_VERIFIED: "Please verify your email first",
  INCORRECT_PASSWORD: "Current password is incorrect",
  SAME_PASSWORD: "New password cannot be same as old password",
  MAX_ATTEMPTS_EXCEEDED: "Too many login attempts. Please try again later.",
};

export const EMAIL_TEMPLATES = {
  VERIFICATION: "email-verification",
  PASSWORD_RESET: "password-reset",
  WELCOME: "welcome",
};
