import { Request } from "express";
import { UserRole } from "./enums";

 
export interface AuthUser {
  _id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}