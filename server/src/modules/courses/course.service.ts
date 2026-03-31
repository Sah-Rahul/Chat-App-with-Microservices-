import {
  CreateCourseDTO,
  UpdateCourseDTO,
  GetCoursesQueryDTO,
} from "./course.dto";

export const createCourse = async (data: CreateCourseDTO, userId: string) => {};

export const getAllCourses = async (query: GetCoursesQueryDTO) => {};

export const getCourseById = async (courseId: string) => {};

export const updateCourse = async (
  courseId: string,
  data: UpdateCourseDTO,
  userId: string,
) => {};

export const deleteCourse = async (courseId: string, userId: string) => {};

export const publishCourse = async (courseId: string, userId: string) => {};

export const unpublishCourse = async (courseId: string, userId: string) => {};

export const getInstructorCourses = async (instructorId: string) => {};

export const getInstituteCourses = async (instituteId: string) => {};

export const getCourseStatistics = async (courseId: string) => {};

export const toggleFeatured = async (courseId: string) => {};

export const toggleBestseller = async (courseId: string) => {};
