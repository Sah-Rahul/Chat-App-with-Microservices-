import { HTTP_STATUS } from "../../constant/httpStatus";
import { ApiError } from "../../utils/ApiError";
import {
  UpdateProgressDTO,
  MarkLectureCompleteDTO,
  GetProgressQueryDTO,
} from "./courseProgress.dto";
import { LectureStatus } from "./courseProgress.enums";
import CourseProgressModel from "./courseProgress.model";
import {
  PROGRESS_CONSTANTS,
  PROGRESS_MESSAGES,
} from "./courseProgress.constants";

export const getOrCreateProgressService = async (
  userId: string,
  courseId: string,
  enrollmentId: string,
  totalLectures: number,
) => {
  const existing = await CourseProgressModel.findOne({ userId, courseId });
  if (existing) return existing;

  const progress = await CourseProgressModel.create({
    userId,
    courseId,
    enrollmentId,
    totalLectures,
    overallProgress: 0,
    completedLectures: 0,
    totalWatchTime: 0,
    sections: [],
    certificateEligible: false,
    lastAccessedAt: new Date(),
  });

  return progress;
};

export const updateProgressService = async (
  userId: string,
  courseId: string,
  data: UpdateProgressDTO,
) => {
  const { sectionId, lectureId, watchedDuration, totalDuration } = data;

  const progress = await CourseProgressModel.findOne({ userId, courseId });

  if (!progress) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, PROGRESS_MESSAGES.NOT_FOUND);
  }

  let section = progress.sections.find((s) => s.sectionId === sectionId);

  if (!section) {
    progress.sections.push({
      sectionId,
      completedLectures: 0,
      totalLectures: 0,
      lectures: [],
    });
    section = progress.sections[progress.sections.length - 1];
  }

  let lecture = section.lectures.find((l) => l.lectureId === lectureId);

  if (!lecture) {
    section.lectures.push({
      lectureId,
      status: LectureStatus.IN_PROGRESS,
      watchedDuration,
      totalDuration,
      lastWatchedAt: new Date(),
    });
    section.totalLectures = section.lectures.length;
  } else {
    if (watchedDuration > lecture.watchedDuration) {
      lecture.watchedDuration = watchedDuration;
    }
    lecture.totalDuration = totalDuration;
    lecture.lastWatchedAt = new Date();

    if (lecture.status === LectureStatus.NOT_STARTED && watchedDuration > 0) {
      lecture.status = LectureStatus.IN_PROGRESS;
    }
  }

  progress.totalWatchTime += PROGRESS_CONSTANTS.PROGRESS_UPDATE_INTERVAL;

  progress.currentLecture = { sectionId, lectureId };
  progress.lastAccessedAt = new Date();

  await progress.save();
  return progress;
};

export const markLectureCompleteService = async (
  userId: string,
  courseId: string,
  data: MarkLectureCompleteDTO,
) => {
  const { sectionId, lectureId } = data;

  const progress = await CourseProgressModel.findOne({ userId, courseId });

  if (!progress) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, PROGRESS_MESSAGES.NOT_FOUND);
  }

  const section = progress.sections.find((s) => s.sectionId === sectionId);

  if (!section) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Section progress not found");
  }

  const lecture = section.lectures.find((l) => l.lectureId === lectureId);

  if (!lecture) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      PROGRESS_MESSAGES.INVALID_LECTURE,
    );
  }

  if (lecture.status === LectureStatus.COMPLETED) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      PROGRESS_MESSAGES.ALREADY_COMPLETED,
    );
  }

  lecture.status = LectureStatus.COMPLETED;
  lecture.completedAt = new Date();

  section.completedLectures = section.lectures.filter(
    (l) => l.status === LectureStatus.COMPLETED,
  ).length;

  progress.completedLectures = progress.sections.reduce(
    (acc, s) => acc + s.completedLectures,
    0,
  );

  const prevProgress = progress.overallProgress;
  progress.overallProgress =
    progress.totalLectures > 0
      ? Math.round((progress.completedLectures / progress.totalLectures) * 100)
      : 0;

  if (progress.overallProgress >= PROGRESS_CONSTANTS.CERTIFICATE_THRESHOLD) {
    progress.certificateEligible = true;
  }

  await progress.save();

  const milestone = getMilestone(prevProgress, progress.overallProgress);

  return { progress, milestone };
};

export const getCourseProgressService = async (
  userId: string,
  courseId: string,
) => {
  const progress = await CourseProgressModel.findOne({ userId, courseId });

  if (!progress) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, PROGRESS_MESSAGES.NOT_FOUND);
  }

  return progress;
};

export const getAllProgressService = async (
  userId: string,
  query: GetProgressQueryDTO,
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "lastAccessedAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;

  const sortOptions: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [progressList, total] = await Promise.all([
    CourseProgressModel.find({ userId })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("courseId", "title thumbnail slug"),
    CourseProgressModel.countDocuments({ userId }),
  ]);

  return {
    progressList,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const calculateOverallProgressService = async (
  userId: string,
  courseId: string,
) => {
  const progress = await CourseProgressModel.findOne({ userId, courseId });

  if (!progress) return 0;

  const completed = progress.sections.reduce(
    (acc, s) =>
      acc +
      s.lectures.filter((l) => l.status === LectureStatus.COMPLETED).length,
    0,
  );

  return progress.totalLectures > 0
    ? Math.round((completed / progress.totalLectures) * 100)
    : 0;
};

export const resetProgressService = async (
  userId: string,
  courseId: string,
) => {
  const progress = await CourseProgressModel.findOne({ userId, courseId });

  if (!progress) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, PROGRESS_MESSAGES.NOT_FOUND);
  }

  progress.overallProgress = 0;
  progress.completedLectures = 0;
  progress.totalWatchTime = 0;
  progress.certificateEligible = false;
  progress.currentLecture = undefined;
  progress.lastAccessedAt = new Date();

  progress.sections.forEach((section) => {
    section.completedLectures = 0;
    section.lectures.forEach((lecture) => {
      lecture.status = LectureStatus.NOT_STARTED;
      lecture.watchedDuration = 0;
      lecture.completedAt = undefined;
      lecture.lastWatchedAt = new Date();
    });
  });

  await progress.save();
  return progress;
};

const getMilestone = (
  prevProgress: number,
  newProgress: number,
): string | null => {
  const milestones = [25, 50, 75, 100] as const;
  for (const m of milestones) {
    if (prevProgress < m && newProgress >= m) {
      return (PROGRESS_CONSTANTS as any).MILESTONES?.[m] ?? null;
    }
  }
  return null;
};
