export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
}

export interface MyProfileDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
