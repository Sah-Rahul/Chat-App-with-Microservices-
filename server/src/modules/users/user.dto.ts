export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar?: string;
  gender?: string;
  dateOfBirth?: Date;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
}

export interface GetUsersQueryDTO {
  role?: string;
  status?: string;
  search?: string;
  isEmailVerified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  isActive?: string;
  sortOrder?: "asc" | "desc";
}
