import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const sendToken = (user: {
  _id: string | { toString: () => string };
}): string => {
  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
