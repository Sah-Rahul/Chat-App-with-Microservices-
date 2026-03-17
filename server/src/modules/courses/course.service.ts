import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../config/cloudinary.config";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import { calculateDiscountedPrice } from "../../utils/calculateDiscountedPrice";
import { UserRole } from "../users/user.enums";
import UserModel from "../users/user.model";
import { COURSE_MESSAGES } from "./course.constants";
import {
  CreateCourseDTO,
  UpdateCourseDTO,
  GetCoursesQueryDTO,
} from "./course.dto";
import { CourseStatus } from "./course.enums";
import CourseModel from "./course.model";

export const createCourseService = async (
  data: CreateCourseDTO,
  userId: string,
  thumbnailFile?: Express.Multer.File,
) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  if (user.role !== UserRole.SUPER_ADMIN) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, COURSE_MESSAGES.NOT_AUTHORIZED);
  }

  if (!thumbnailFile) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Thumbnail is required");
  }

  const discountedPrice = calculateDiscountedPrice(
    data.price,
    data.discountPercentage ?? 0,
  );

  const thumbnailUpload = await uploadToCloudinary(
    thumbnailFile.buffer,
    "lms/courses/thumbnails",
  );

  const course = await CourseModel.create({
    ...data,
    instructorId: userId,
    status: CourseStatus.DRAFT,
    discountedPrice,
    discountPercentage: data.discountPercentage ?? 0,
    thumbnail: {
      url: thumbnailUpload.secure_url,
      publicId: thumbnailUpload.public_id,
    },
  });

  await course.populate({
    path: "instructorId",
    select: "firstName image experience bio",
  });

  return course;
};

export const updateCourseService = async (
  courseId: string,
  userId: string,
  data: UpdateCourseDTO,
  thumbnailFile?: Express.Multer.File,
) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  if (course.instructorId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, COURSE_MESSAGES.NOT_AUTHORIZED);
  }

  const newPrice = data.price ?? course.price;
  const newDiscountPercentage =
    data.discountPercentage ?? course.discountPercentage ?? 0;
  const discountedPrice = calculateDiscountedPrice(
    newPrice,
    newDiscountPercentage,
  );

  let thumbnailUpdate: { url: string; publicId: string } | undefined;
  if (thumbnailFile) {
    await deleteFromCloudinary(course.thumbnail.publicId);
    const thumbnailUpload = await uploadToCloudinary(
      thumbnailFile.buffer,
      "lms/courses/thumbnails",
    );
    thumbnailUpdate = {
      url: thumbnailUpload.secure_url,
      publicId: thumbnailUpload.public_id,
    };
  }

  const updated = await CourseModel.findByIdAndUpdate(
    courseId,
    {
      ...data,
      discountedPrice,
      discountPercentage: newDiscountPercentage,
      ...(thumbnailUpdate && { thumbnail: thumbnailUpdate }),
    },
    { new: true, runValidators: true },
  );

  return updated;
};

export const getAllCoursesService = async (query: GetCoursesQueryDTO) => {
  const allCourse = await CourseModel.find();
  return allCourse;
};

 

export const deleteCourseService = async (courseId: string, userId: string) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  if (course.instructorId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, COURSE_MESSAGES.NOT_AUTHORIZED);
  }

  await deleteFromCloudinary(course.thumbnail.publicId);

  await CourseModel.findByIdAndDelete(courseId);
};

export const publishCourseService = async (
  courseId: string,
  userId: string,
) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  if (course.instructorId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, COURSE_MESSAGES.NOT_AUTHORIZED);
  }

  if (course.status === CourseStatus.PUBLISHED) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Course is already published");
  }

  if (!course.thumbnail?.url) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Thumbnail is required to publish",
    );
  }

  const updated = await CourseModel.findByIdAndUpdate(
    courseId,
    {
      status: CourseStatus.PUBLISHED,
      coursePublish: true,
      publishedAt: new Date(),
    },
    { new: true },
  );

  return updated;
};

export const unpublishCourseService = async (
  courseId: string,
  userId: string,
) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  if (course.instructorId.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, COURSE_MESSAGES.NOT_AUTHORIZED);
  }

  if (course.status === CourseStatus.UNPUBLISHED) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Course is already unpublished",
    );
  }

  const updated = await CourseModel.findByIdAndUpdate(
    courseId,
    {
      status: CourseStatus.UNPUBLISHED,
      coursePublish: false,
    },
    { new: true },
  );

  return updated;
};

export const getInstructorCoursesService = async (instructorId: string) => {
  const courses = await CourseModel.find({ instructorId })
    .populate("categoryId", "name")
    .sort({ createdAt: -1 });

  return courses;
};

export const getInstituteCoursesService = async (instituteId: string) => {
  const courses = await CourseModel.find({ instituteId })
    .populate("categoryId", "name")
    .populate("instructorId", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  return courses;
};

export const getCourseStatisticsService = async (courseId: string) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  return {
    totalEnrollments: course.totalEnrollments,
    totalReviews: course.totalReviews,
    rating: course.rating,
    totalLectures: course.totalLectures,
    duration: course.duration,
    revenue: course.totalEnrollments * course.discountedPrice,
  };
};

export const toggleFeaturedService = async (courseId: string) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  const updated = await CourseModel.findByIdAndUpdate(
    courseId,
    { isFeatured: !course.isFeatured },
    { new: true },
  );

  return updated;
};

export const toggleBestsellerService = async (courseId: string) => {
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  const updated = await CourseModel.findByIdAndUpdate(
    courseId,
    { isBestseller: !course.isBestseller },
    { new: true },
  );

  return updated;
};

export const getCourseBySlugService = async (slug: string) => {
  const course = await CourseModel.findOne({ slug, coursePublish: true })
    .populate("categoryId", "name")
    .populate("instructorId", "firstName lastName avatar bio");

  if (!course) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, COURSE_MESSAGES.NOT_FOUND);
  }

  return course;
};
