import { Request, Response, NextFunction } from "express";
import * as enrollmentService from "./enrollment.service";
import asyncHandler from "../../utils/AsyncHandler";

export const createEnrollment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const getAllEnrollments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const getEnrollmentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const getCourseEnrollments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const getMyCourseEnrollments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const updateEnrollment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const getEnrollmentStatistics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const checkEnrollment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const extendEnrollment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const revokeEnrollment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {},
);
