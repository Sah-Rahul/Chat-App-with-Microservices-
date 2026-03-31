import { Role } from "../common/constants/roles";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: Role; 
      };
    }
  }
}

export {};
