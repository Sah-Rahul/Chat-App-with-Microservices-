import { axiosInstance } from "../axiosInstance";

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export const registerApi = async (data: RegisterDto) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Registration failed",
    );
  }
};

export const loginApi = async (data: LoginDto) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Login failed",
    );
  }
};

export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Logout failed",
    );
  }
};
