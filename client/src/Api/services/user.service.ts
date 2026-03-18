import { axiosInstance } from "../axiosInstance";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "getAllStudents failed",
    );
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "getProfile failed",
    );
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await axiosInstance.put("/user/update/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "updateProfile failed",
    );
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "getUserById failed",
    );
  }
};
