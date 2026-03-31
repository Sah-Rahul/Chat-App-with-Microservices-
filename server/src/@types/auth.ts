import { UserRole } from "../modules/users/user.enums";

export interface AuthUserPayload {
  _id: string;
  email: string;
  roles: UserRole[];
  iat?: number;
  exp?: number;
}
