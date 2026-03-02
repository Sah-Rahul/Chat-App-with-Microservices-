import { Role } from "../common/constants/roles";

declare global {
  namespace Express {
    interface Request {
      files?: Multer.File[];
      user?: {
        _id: string;
        role: Role;
        email?: string;
      };
    }
  }
}

export {};
