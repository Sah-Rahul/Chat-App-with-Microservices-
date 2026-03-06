import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../config/cloudinary.config";
import { UserRole } from "../users/user.enums";
import UserModel from "../users/user.model";
import LectureModel from "./lecture.model";
import { LectureStatus } from "./lecture.enums";
import { LECTURE_MESSAGES } from "./lecture.constants";
import { CreateLectureDTO, UpdateLectureDTO } from "./lecture.dto";
import CourseModel from "../courses/course.model";

export const createLectureService = async (
  userId: string,
  data: CreateLectureDTO,
  videoFile?: Express.Multer.File,
) => {
  const course = await CourseModel.findById(data.courseId);
  if (!course) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      LECTURE_MESSAGES.COURSE_NOT_FOUND,
    );
  }

  if (course.instructorId.toString() !== userId) {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== UserRole.SUPER_ADMIN) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        LECTURE_MESSAGES.NOT_AUTHORIZED,
      );
    }
  }

  const section = course.curriculum.find(
    (s) => (s as any)._id?.toString() === data.sectionId,
  );
  if (!section) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      LECTURE_MESSAGES.SECTION_NOT_FOUND,
    );
  }

  const lastLecture = await LectureModel.findOne({
    courseId: data.courseId,
    sectionId: data.sectionId,
  }).sort({ order: -1 });

  const order = lastLecture ? lastLecture.order + 1 : 0;

  let video: { url: string; publicId: string; duration: number } | undefined;
  if (videoFile) {
    const upload = await uploadToCloudinary(
      videoFile.buffer,
      `lms/courses/${data.courseId}/lectures`,
    );
    video = {
      url: upload.secure_url,
      publicId: upload.public_id,
      duration: (upload as any).duration ?? 0,
    };
  }

  const lecture = await LectureModel.create({
    ...data,
    order,
    status: LectureStatus.DRAFT,
    ...(video && { video }),
  });

  await CourseModel.findByIdAndUpdate(data.courseId, {
    $inc: {
      totalLectures: 1,
      duration: video?.duration ?? 0,
    },
  });

  return lecture;
};

export const getLecturesByCourseService = async (
  courseId: string,
  userId?: string,
) => {
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      LECTURE_MESSAGES.COURSE_NOT_FOUND,
    );
  }

  const isInstructor = userId && course.instructorId.toString() === userId;

  const filter: Record<string, any> = { courseId };
  if (!isInstructor) {
    filter.status = LectureStatus.PUBLISHED;
  }

  const lectures = await LectureModel.find(filter).sort({ order: 1 });

  const grouped = course.curriculum.map((section) => {
    const sectionId = (section as any)._id?.toString();

    const sectionLectures = lectures
      .filter((l) => l.sectionId === sectionId)
      .map((l) => {
        const obj = l.toObject();

        if (!isInstructor && !obj.isPreview && obj.video) {
          const { url, ...videoWithoutUrl } = obj.video;
          return { ...obj, video: videoWithoutUrl };
        }

        return obj;
      });

    return {
      sectionId,
      sectionTitle: section.title,
      totalLectures: sectionLectures.length,
      lectures: sectionLectures,
    };
  });

  return grouped;
};

export const getLectureByIdService = async (
  lectureId: string,
  userId?: string,
) => {
  const lecture = await LectureModel.findById(lectureId);
  if (!lecture) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, LECTURE_MESSAGES.NOT_FOUND);
  }

  const course = await CourseModel.findById(lecture.courseId);
  const isInstructor = userId && course?.instructorId.toString() === userId;

  const obj = lecture.toObject();

  if (!isInstructor && !obj.isPreview && obj.video) {
    const { url, ...videoWithoutUrl } = obj.video;
    return { ...obj, video: videoWithoutUrl };
  }

  return obj;
};

export const updateLectureService = async (
  lectureId: string,
  userId: string,
  data: UpdateLectureDTO,
  videoFile?: Express.Multer.File,
) => {
  const lecture = await LectureModel.findById(lectureId);
  if (!lecture) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, LECTURE_MESSAGES.NOT_FOUND);
  }

  const course = await CourseModel.findById(lecture.courseId);
  if (!course) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      LECTURE_MESSAGES.COURSE_NOT_FOUND,
    );
  }
  if (course.instructorId.toString() !== userId) {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== UserRole.SUPER_ADMIN) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        LECTURE_MESSAGES.NOT_AUTHORIZED,
      );
    }
  }

  let videoUpdate:
    | { url: string; publicId: string; duration: number }
    | undefined;
  if (videoFile) {
    if (lecture.video?.publicId) {
      await deleteFromCloudinary(lecture.video.publicId);
      await CourseModel.findByIdAndUpdate(lecture.courseId, {
        $inc: { duration: -(lecture.video.duration ?? 0) },
      });
    }

    const upload = await uploadToCloudinary(
      videoFile.buffer,
      `lms/courses/${lecture.courseId}/lectures`,
    );
    videoUpdate = {
      url: upload.secure_url,
      publicId: upload.public_id,
      duration: (upload as any).duration ?? 0,
    };

    await CourseModel.findByIdAndUpdate(lecture.courseId, {
      $inc: { duration: videoUpdate.duration },
    });
  }

  const updated = await LectureModel.findByIdAndUpdate(
    lectureId,
    { ...data, ...(videoUpdate && { video: videoUpdate }) },
    { new: true, runValidators: true },
  );

  return updated;
};

export const deleteLectureService = async (
  lectureId: string,
  userId: string,
) => {
  const lecture = await LectureModel.findById(lectureId);
  if (!lecture) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, LECTURE_MESSAGES.NOT_FOUND);
  }

  const course = await CourseModel.findById(lecture.courseId);
  if (!course) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      LECTURE_MESSAGES.COURSE_NOT_FOUND,
    );
  }
  if (course.instructorId.toString() !== userId) {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== UserRole.SUPER_ADMIN) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        LECTURE_MESSAGES.NOT_AUTHORIZED,
      );
    }
  }

  if (lecture.video?.publicId) {
    await deleteFromCloudinary(lecture.video.publicId);
  }

  await LectureModel.findByIdAndDelete(lectureId);

  await CourseModel.findByIdAndUpdate(lecture.courseId, {
    $inc: {
      totalLectures: -1,
      duration: -(lecture.video?.duration ?? 0),
    },
  });
};
