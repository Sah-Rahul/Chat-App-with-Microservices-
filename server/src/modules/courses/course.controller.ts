import { Request, Response } from "express";
import * as courseService from "./course.service";
import asyncHandler from "../../utils/AsyncHandler";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import { COURSE_MESSAGES } from "./course.constants";
import { GetCoursesQueryDTO, UpdateCourseDTO } from "./course.dto";
import { getParam } from "../../utils/getParams";

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const thumbnailFile = (req as any).files?.thumbnail?.[0];

    const course = await courseService.createCourseService(
      req.body,
      userId,
      thumbnailFile,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(HTTP_STATUS.CREATED, course, COURSE_MESSAGES.CREATED),
      );
  },
);

export const getAllCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query as unknown as GetCoursesQueryDTO;

    const result = await courseService.getAllCoursesService(query);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, result, COURSE_MESSAGES.FETCHED_ALL),
      );
  },
);

export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);

    const course = await courseService.getCourseByIdService(courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, course, COURSE_MESSAGES.FETCHED));
  },
);

export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);
    const userId = (req as any).user?.userId;
    const thumbnailFile = (req as any).files?.thumbnail?.[0];
    const data: UpdateCourseDTO = req.body;

    const updated = await courseService.updateCourseService(
      courseId,
      userId,
      data,
      thumbnailFile,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, updated, COURSE_MESSAGES.UPDATED));
  },
);

export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);
    const userId = (req as any).user?.userId;

    await courseService.deleteCourseService(courseId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, null, COURSE_MESSAGES.DELETED));
  },
);

export const publishCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);
    const userId = (req as any).user?.userId;

    const course = await courseService.publishCourseService(courseId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, course, COURSE_MESSAGES.PUBLISHED));
  },
);

export const unpublishCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);
    const userId = (req as any).user?.userId;

    const course = await courseService.unpublishCourseService(courseId, userId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, course, COURSE_MESSAGES.UNPUBLISHED),
      );
  },
);

export const getInstructorCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const instructorId = getParam(req.params.instructorId);

    const courses =
      await courseService.getInstructorCoursesService(instructorId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, courses, COURSE_MESSAGES.FETCHED_ALL),
      );
  },
);

export const getCourseStatistics = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);

    const stats = await courseService.getCourseStatisticsService(courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          stats,
          COURSE_MESSAGES.STATISTICS_FETCHED,
        ),
      );
  },
);

export const toggleFeatured = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);

    const course = await courseService.toggleFeaturedService(courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          course,
          COURSE_MESSAGES.FEATURED_TOGGLED,
        ),
      );
  },
);

export const toggleBestseller = asyncHandler(
  async (req: Request, res: Response) => {
    const courseId = getParam(req.params.id);

    const course = await courseService.toggleBestsellerService(courseId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          course,
          COURSE_MESSAGES.BESTSELLER_TOGGLED,
        ),
      );
  },
);

export const getCourseBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = getParam(req.params.slug);

    const course = await courseService.getCourseBySlugService(slug);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, course, COURSE_MESSAGES.FETCHED));
  },
);
