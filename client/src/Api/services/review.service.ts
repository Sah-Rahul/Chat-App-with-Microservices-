import { axiosInstance } from "../axiosInstance";

interface ReviewData {
  type: "course";      
  courseSlug: string;
  comment: string;
  rating: number;
}

export const reviewOnCourseApi = async (data: ReviewData) => {
  try {
    const res = await axiosInstance.post("/review", data);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Submit review failed"
    );
  }
};

export const updateReviewOnCourseApi = async (
  reviewId: string,
  data: Partial<ReviewData>
) => {
  try {
    const res = await axiosInstance.put(`/review/${reviewId}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Update review failed"
    );
  }
};

export const deleteReviewOnCourseApi = async (reviewId: string) => {
  try {
    const res = await axiosInstance.delete(`/review/${reviewId}`);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Delete review failed"
    );
  }
};

export const getReviewsByCourseApi = async (courseSlug: string) => {
  try {
    const res = await axiosInstance.get(`/review/`, {
      params: { courseSlug },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetch reviews failed"
    );
  }
};