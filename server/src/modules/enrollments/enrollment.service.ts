import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import EnrollmentModel from "./enrollment.model";
import CourseModel from "../courses/course.model";
import { CreateEnrollmentDTO, UpdateEnrollmentDTO } from "./enrollment.dto";
import { EnrollmentStatus, EnrollmentType } from "./enrollment.enums";
import { ENROLLMENT_MESSAGES } from "./enrollment.constants";

export const createEnrollment = async (
  data: CreateEnrollmentDTO,
  userId: string,
) => {
  const course = await CourseModel.findById(data.courseId);

  if (!course) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      ENROLLMENT_MESSAGES.NOT_FOUND, 
    );
  }

  const existing = await EnrollmentModel.findOne({
    userId,
    courseId: data.courseId,
  });

  if (existing) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      ENROLLMENT_MESSAGES.ALREADY_ENROLLED,
    );
  }

  const enrollment = await EnrollmentModel.create({
    userId,
    courseId: data.courseId,
    instituteId: course.categoryId,
    orderId: data.orderId,
    type: data.type || EnrollmentType.PAID,
    status: EnrollmentStatus.ACTIVE,
    totalLectures: course.totalLectures || 0,
    enrolledAt: new Date(),
  });

  await CourseModel.findByIdAndUpdate(data.courseId, {
    $inc: { totalEnrollments: 1 },
  });

  return enrollment;
};

export const getMyEnrollments = async (userId: string) => {
  return EnrollmentModel.find({
    userId,
    status: EnrollmentStatus.ACTIVE,
  })
    .populate("courseId", "title thumbnail price level totalLectures slug")
    .sort({ enrolledAt: -1 });
};

export const checkEnrollment = async (userId: string, courseId: string) => {
  const enrollment = await EnrollmentModel.findOne({
    userId,
    courseId,
    status: EnrollmentStatus.ACTIVE,
  });

  return {
    isEnrolled: !!enrollment,
    enrollment: enrollment || null,
  };
};

export const updateEnrollment = async (
  userId: string,
  courseId: string,
  data: UpdateEnrollmentDTO,
) => {
  const enrollment = await EnrollmentModel.findOne({ userId, courseId });

  if (!enrollment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, ENROLLMENT_MESSAGES.NOT_FOUND);
  }

  if (data.progress !== undefined) {
    enrollment.progress = data.progress;
  }

  if (data.completedLectures !== undefined) {
    enrollment.completedLectures = data.completedLectures;
  }

  if (enrollment.progress === 100 && !enrollment.completedAt) {
    enrollment.completedAt = new Date();
    enrollment.status = EnrollmentStatus.COMPLETED;
  }

  enrollment.lastAccessedAt = new Date();

  await enrollment.save();

  return enrollment;
};
