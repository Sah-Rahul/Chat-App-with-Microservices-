import { Request, Response, NextFunction } from "express";  
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constant/httpStatus";
import { UserRole } from "../modules/users/user.enums";

export const allowRoles =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, "Forbidden");
    }

    next();
  };
