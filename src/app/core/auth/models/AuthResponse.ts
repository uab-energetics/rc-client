import { User } from "./User";

export interface AuthResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}