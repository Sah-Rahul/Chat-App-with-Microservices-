import { Request, Response, NextFunction } from "express";
import * as instructorRequestService from "./instructorRequest.service";
import {
  CreateInstructorRequestDTO,
  LoginInstructorDTO,
  RegisterInstructorRequestDTO,
  UpdateInstructorRequestDTO,
} from "./instructorRequest.dto";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiResponse } from "../../utils/ApiResponse";
import asyncHandler from "../../utils/AsyncHandler";
import { INSTRUCTOR_REQUEST_MESSAGES } from "./instructorRequest.constants";
import { getParam } from "../../utils/getParams";
import { ApiError } from "../../utils/ApiError";

export const RegisterAsInstructor = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    const data: RegisterInstructorRequestDTO = req.body;

    const instructorRequest =
      await instructorRequestService.registerAsInstructorService(userId, data);

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          instructorRequest,
          "Instructor register successfully",
        ),
      );
  },
);

export const loginAsInstructor = asyncHandler(
  async (req: Request, res: Response) => {
    const data: LoginInstructorDTO = req.body;

    const user = await instructorRequestService.loginAsInstructorService(data);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, user, "Instructor login successful"),
      );
  },
);

export const createInstructorRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;

    if (!userId) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "User not authenticated");
    }

    const parsedData: CreateInstructorRequestDTO = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      bio: req.body.bio,
      experienceYears: Number(req.body.experienceYears),
      expertiseLevel: req.body.expertiseLevel,
      instituteId: req.body.instituteId || undefined,

      expertise: req.body.expertise ? JSON.parse(req.body.expertise) : [],
      qualifications: req.body.qualifications
        ? JSON.parse(req.body.qualifications)
        : [],
      workExperience: req.body.workExperience
        ? JSON.parse(req.body.workExperience)
        : [],
      achievements: req.body.achievements
        ? JSON.parse(req.body.achievements)
        : undefined,
      socialLinks: req.body.socialLinks
        ? JSON.parse(req.body.socialLinks)
        : undefined,
      sampleContent: req.body.sampleContent
        ? JSON.parse(req.body.sampleContent)
        : undefined,
    };

    const instructorRequest =
      await instructorRequestService.createInstructorRequestService(
        userId,
        parsedData,
        req.files as Express.Multer.File[],
      );

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          instructorRequest,
          INSTRUCTOR_REQUEST_MESSAGES.SUBMITTED,
        ),
      );
  },
);

export const getAllInstructorRequests = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allRequests =
      await instructorRequestService.getAllInstructorRequestsService();

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          allRequests,
          INSTRUCTOR_REQUEST_MESSAGES.FETCHED,
        ),
      );
  },
);

export const getInstructorRequestById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const requestId = getParam(req.params.id);

    const instructorRequest =
      await instructorRequestService.getInstructorRequestByIdService(requestId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          instructorRequest,
          INSTRUCTOR_REQUEST_MESSAGES.FETCHED,
        ),
      );
  },
);

export const getMyInstructorRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.userId;

    const myInstructorRequests =
      await instructorRequestService.getMyInstructorRequestService(userId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          myInstructorRequests,
          INSTRUCTOR_REQUEST_MESSAGES.FETCHED,
        ),
      );
  },
);

export const updateInstructorRequest = asyncHandler(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const requestId = getParam(req.params.id);
    const userId = (req as any).user?.userId;
    const data: UpdateInstructorRequestDTO = req.body;

    const updatedRequest =
      await instructorRequestService.updateInstructorRequestService(
        requestId,
        data,
        userId,
        req.file,
      );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          updatedRequest,
          INSTRUCTOR_REQUEST_MESSAGES.UPDATED,
        ),
      );
  },
);

export const deleteInstructorRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const requestId = getParam(req.params.id);
    const userId = (req as any).user?.userId;

    const deletedRequest =
      await instructorRequestService.deleteInstructorRequestService(
        requestId,
        userId,
      );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          deletedRequest,
          INSTRUCTOR_REQUEST_MESSAGES.DELETED,
        ),
      );
  },
);

export const reviewInstructorRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const requestId = getParam(req.params.id);
    const reviewerId = (req as any).user?.userId;

    const data = req.body;

    const updatedRequest =
      await instructorRequestService.reviewInstructorRequestService(
        requestId,
        data,
        reviewerId,
      );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          updatedRequest,
          INSTRUCTOR_REQUEST_MESSAGES.REVIEWED,
        ),
      );
  },
);
