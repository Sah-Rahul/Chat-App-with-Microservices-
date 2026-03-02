import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../config/cloudinary.config";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { UserRole } from "../users/user.enums";
import UserModel from "../users/user.model";
import bcrypt from "bcryptjs";
import { INSTRUCTOR_REQUEST_MESSAGES } from "./instructorRequest.constants";
import {
  CreateInstructorRequestDTO,
  UpdateInstructorRequestDTO,
  ReviewInstructorRequestDTO,
  LoginInstructorDTO,
  RegisterInstructorRequestDTO,
} from "./instructorRequest.dto";
import { InstructorRequestStatus } from "./instructorRequest.enums";
import InstructorRequestModel, {
  IInstructorRequest,
} from "./instructorRequest.model";
import { Types } from "mongoose";

export const registerAsInstructorService = async (
  userId: string,
  data: RegisterInstructorRequestDTO,
) => {
  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  if (user.role !== UserRole.STUDENT) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Only students can apply for instructor",
    );
  }

  const existingRequest = await InstructorRequestModel.findOne({ userId });

  if (existingRequest) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Instructor request already exists",
    );
  }

  const newRequest = await InstructorRequestModel.create({
    userId,
    ...data,
  });

  return newRequest;
};

export const loginAsInstructorService = async (data: LoginInstructorDTO) => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  return user;
};

export const createInstructorRequestService = async (
  userId: string,
  data: CreateInstructorRequestDTO,
  files?: Express.Multer.File[],
): Promise<IInstructorRequest> => {
  if (!userId) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      INSTRUCTOR_REQUEST_MESSAGES.UNAUTHORIZED,
    );
  }

  const existingRequest = await InstructorRequestModel.findOne({
    userId,
    status: InstructorRequestStatus.PENDING,
  });

  if (existingRequest) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      INSTRUCTOR_REQUEST_MESSAGES.ALREADY_APPLIED,
    );
  }

  let documents: IInstructorRequest["documents"] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      try {
        const result = await uploadToCloudinary(
          file.buffer,
          "instructor-documents",
        );

        documents.push({
          type: file.mimetype,
          name: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          uploadedAt: new Date(),
        });
      } catch (error) {
        console.error(`Failed to upload file ${file.originalname}:`, error);
      }
    }
  }

  const newRequest = await InstructorRequestModel.create({
    userId,
    ...data,
    documents,
    status: InstructorRequestStatus.PENDING,
  });

  return newRequest;
};

export const getAllInstructorRequestsService = async () => {
  const requests = await InstructorRequestModel.find().exec();

  return requests;
};

export const getInstructorRequestByIdService = async (requestId: string) => {
  if (!requestId || typeof requestId !== "string" || requestId.trim() === "") {
    throw new Error("Invalid request ID");
  }

  const instructorRequest = await InstructorRequestModel.findById(requestId);

  if (!instructorRequest) {
    throw new Error("Instructor request not found");
  }

  return instructorRequest;
};

export const getMyInstructorRequestService = async (userId: string) => {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new Error("Invalid user ID");
  }

  const myInstructorRequests = await InstructorRequestModel.find({
    user: userId,
  }).exec();

  if (!myInstructorRequests || myInstructorRequests.length === 0) {
    throw new Error("No instructor requests found for this user");
  }

  return myInstructorRequests;
};

export const updateInstructorRequestService = async (
  requestId: string,
  data: UpdateInstructorRequestDTO,
  userId: string,
  file?: Express.Multer.File,
): Promise<IInstructorRequest> => {
  if (!requestId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid request ID");
  }

  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const request = await InstructorRequestModel.findById(requestId).exec();
  if (!request) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTRUCTOR_REQUEST_MESSAGES.NOT_FOUND,
    );
  }

  if (request.userId.toString() !== userId.toString()) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      INSTRUCTOR_REQUEST_MESSAGES.UNAUTHORIZED,
    );
  }

  if (file) {
    if (request.documents && request.documents.length > 0) {
      const oldPublicId = request.documents[0].publicId;
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    const result = await uploadToCloudinary(file.buffer, "Documents");

    request.documents = [
      {
        type: file.mimetype,
        name: file.originalname,
        url: result.secure_url,
        publicId: result.public_id,
        uploadedAt: new Date(),
      },
    ];
  }

  Object.assign(request, data);

  await request.save();

  return request;
};

export const deleteInstructorRequestService = async (
  requestId: string,
  userId: string,
): Promise<IInstructorRequest> => {
  if (!requestId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Request ID is required");
  }

  if (!userId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const instructorRequest = (await InstructorRequestModel.findById(
    requestId,
  ).exec()) as IInstructorRequest | null;
  if (!instructorRequest) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTRUCTOR_REQUEST_MESSAGES.NOT_FOUND,
    );
  }

  if (instructorRequest.userId.toString() !== userId.toString()) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      INSTRUCTOR_REQUEST_MESSAGES.UNAUTHORIZED,
    );
  }

  await InstructorRequestModel.findByIdAndDelete(requestId).exec();

  return instructorRequest;
};

export const reviewInstructorRequestService = async (
  requestId: string,
  data: ReviewInstructorRequestDTO,
  reviewerId: string,
): Promise<IInstructorRequest> => {
  if (!requestId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Request ID is required");
  }

  if (!reviewerId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Reviewer must be logged in");
  }

  const { status, approvalNotes, rejectionReason } = data;

  const validStatuses: InstructorRequestStatus[] = [
    InstructorRequestStatus.APPROVED,
    InstructorRequestStatus.REJECTED,
    InstructorRequestStatus.CANCELLED,
    InstructorRequestStatus.PENDING,
    InstructorRequestStatus.UNDER_REVIEW,
  ];

  if (!validStatuses.includes(status)) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Status must be one of: ${validStatuses.join(", ")}`,
    );
  }

  const instructorRequest = (await InstructorRequestModel.findById(
    requestId,
  ).exec()) as IInstructorRequest | null;
  if (!instructorRequest) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTRUCTOR_REQUEST_MESSAGES.NOT_FOUND,
    );
  }

  const reviewer = await UserModel.findById(reviewerId).exec();
  if (!reviewer || reviewer.role !== UserRole.SUPER_ADMIN) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Reviewer not authorized");
  }

  instructorRequest.status = status;

  if (status === InstructorRequestStatus.APPROVED) {
    instructorRequest.approvalNotes = approvalNotes || "";
    instructorRequest.rejectionReason = undefined;
  } else if (status === InstructorRequestStatus.REJECTED) {
    instructorRequest.rejectionReason = rejectionReason || "";
    instructorRequest.approvalNotes = undefined;
  } else {
    instructorRequest.approvalNotes = undefined;
    instructorRequest.rejectionReason = undefined;
  }

  await instructorRequest.save();

  return instructorRequest;
};
