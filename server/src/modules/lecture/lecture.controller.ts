import { Request, Response } from "express";
import * as lectureService from "./lecture.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { LECTURE_MESSAGES } from "./lecture.constants";
import { UpdateLectureDTO } from "./lecture.dto";
import { getParam } from "../../utils/getParams";

export const createLecture = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const videoFile = (req as any).file;    

    const lecture = await lectureService.createLectureService(
      userId,
      req.body,
      videoFile,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, lecture, LECTURE_MESSAGES.CREATED));
  },
);

 
export const getLecturesByCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.courseId);
    const userId = (req as any).user?.userId;

    const grouped = await lectureService.getLecturesByCourseService(courseId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, grouped, LECTURE_MESSAGES.FETCHED_ALL));
  },
);

export const getLectureById = asyncHandler(
  async (req: Request, res: Response) => {
    const lectureId = getParam(req.params.lectureId);
    const userId = (req as any).user?.userId;

    const lecture = await lectureService.getLectureByIdService(lectureId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, lecture, LECTURE_MESSAGES.FETCHED));
  },
);

export const updateLecture = asyncHandler(
  async (req: Request, res: Response) => {
    const lectureId = getParam(req.params.lectureId);
    const userId = (req as any).user?.userId;
    const videoFile = (req as any).file;
    const data: UpdateLectureDTO = req.body;

    const updated = await lectureService.updateLectureService(
      lectureId,
      userId,
      data,
      videoFile,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, updated, LECTURE_MESSAGES.UPDATED));
  },
);

export const deleteLecture = asyncHandler(
  async (req: Request, res: Response) => {
    const lectureId = getParam(req.params.lectureId);
    const userId = (req as any).user?.userId;

    await lectureService.deleteLectureService(lectureId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, null, LECTURE_MESSAGES.DELETED));
  },
);

 