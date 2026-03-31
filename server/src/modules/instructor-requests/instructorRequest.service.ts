import {
  CreateInstructorRequestDTO,
  UpdateInstructorRequestDTO,
  ReviewInstructorRequestDTO,
  GetInstructorRequestsQueryDTO,
} from "./instructorRequest.dto";

export const createInstructorRequest = async (
  data: CreateInstructorRequestDTO,
  userId: string,
) => {
  // TODO: Create instructor request
};

export const getAllInstructorRequests = async (
  query: GetInstructorRequestsQueryDTO,
) => {
  // TODO: Get all instructor requests
};

export const getInstructorRequestById = async (requestId: string) => {
  // TODO: Get request by ID
};

export const getMyInstructorRequest = async (userId: string) => {
  // TODO: Get user's instructor request
};

export const updateInstructorRequest = async (
  requestId: string,
  data: UpdateInstructorRequestDTO,
  userId: string,
) => {
  // TODO: Update instructor request
};

export const deleteInstructorRequest = async (
  requestId: string,
  userId: string,
) => {
  // TODO: Delete/cancel request
};

export const reviewInstructorRequest = async (
  requestId: string,
  data: ReviewInstructorRequestDTO,
  reviewerId: string,
) => {
  // TODO: Approve/reject instructor request
};

export const scheduleInterview = async (
  requestId: string,
  interviewDate: Date,
  reviewerId: string,
) => {
  // TODO: Schedule interview
};
