import { Request, Response, NextFunction } from "express";
import * as progressService from "./courseProgress.service";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { PROGRESS_MESSAGES } from "./courseProgress.constants";
import {
  GetProgressQueryDTO,
  MarkLectureCompleteDTO,
  UpdateProgressDTO,
} from "./courseProgress.dto";
import { getParam } from "../../utils/getParams";

export const updateProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.courseId);
    const data: UpdateProgressDTO = req.body;

    const progress = await progressService.updateProgressService(
      userId,
      courseId,
      data,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, progress, PROGRESS_MESSAGES.UPDATED),
      );
  } catch (error) {
    next(error);
  }
};

export const markLectureComplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.courseId);

    const data: MarkLectureCompleteDTO = req.body;

    const { progress, milestone } =
      await progressService.markLectureCompleteService(userId, courseId, data);

    const message = milestone ?? PROGRESS_MESSAGES.LECTURE_COMPLETED;

    const finalMessage =
      progress.overallProgress === 100
        ? PROGRESS_MESSAGES.COURSE_COMPLETED
        : progress.certificateEligible
          ? PROGRESS_MESSAGES.CERTIFICATE_ELIGIBLE
          : message;

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, progress, finalMessage));
  } catch (error) {
    next(error);
  }
};

export const getCourseProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.courseId);

    const progress = await progressService.getCourseProgressService(
      userId,
      courseId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          progress,
          "Progress fetched successfully",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getAllProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const query = req.query as unknown as GetProgressQueryDTO;

    const result = await progressService.getAllProgressService(userId, query);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          result,
          "All progress fetched successfully",
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const resetProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.userId;
    const courseId = getParam(req.params.courseId);

    const progress = await progressService.resetProgressService(
      userId,
      courseId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          progress,
          "Progress reset successfully",
        ),
      );
  } catch (error) {
    next(error);
  }
};
