import { Request, Response } from "express";
import * as enrollmentService from "./enrollment.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { getParam } from "../../utils/getParams";
import { ENROLLMENT_MESSAGES } from "./enrollment.constants";

export const createEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const enrollment = await enrollmentService.createEnrollment(
      req.body,
      userId,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          enrollment,
          ENROLLMENT_MESSAGES.CREATED,
        ),
      );
  },
);

export const getMyEnrollments = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const enrollments = await enrollmentService.getMyEnrollments(userId);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        enrollments,
        "My enrollments fetched", // (optional: make constant if reused)
      ),
    );
  },
);

export const checkEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.courseId);

    const result = await enrollmentService.checkEnrollment(userId, courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, result, "Enrollment check done"));
  },
);

export const updateEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.courseId);

    const enrollment = await enrollmentService.updateEnrollment(
      userId,
      courseId,
      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          enrollment,
          ENROLLMENT_MESSAGES.PROGRESS_UPDATED,
        ),
      );
  },
);
