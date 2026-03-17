import { axiosInstance } from "../axiosInstance";

export const createCourseApi = async (data: FormData) => {
  try {
    const res = await axiosInstance.post("/course/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Create course failed",
    );
  }
};

export const updateCourseApi = async (courseId: string, data: any) => {
  try {
    const res = await axiosInstance.put(`/course/${courseId}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Update course failed",
    );
  }
};

export const deleteCourseApi = async (courseId: string) => {
  try {
    const res = await axiosInstance.delete(`/course/${courseId}`);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Delete course failed",
    );
  }
};

export const getAllCourseApi = async (limit?: number) => {
  try {
    const res = await axiosInstance.get("/course/", {
      params: { limit },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Get courses failed",
    );
  }
};

export const getCourseBySlugApi = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`/course/slug/${slug}`);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Get course by slug failed",
    );
  }
};

export const toggleBestCourseSellerApi = async (courseId: string) => {
  try {
    const res = await axiosInstance.patch(`/course/${courseId}/bestseller`);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Toggle bestseller failed",
    );
  }
};

export const getInstructorCoursesApi = async (instructorId: string) => {
  try {
    const res = await axiosInstance.get(`/course/instructor/${instructorId}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};