import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import Trycatch from "../config/Trycatch.js";
import User from "../model/user.model.js";
import type { IUser } from "../model/user.model.js";

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isauth = Trycatch(
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized, token missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Not authorized, token missing" });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;

    next();
  }
);
