
import {AppUser} from "./AppUser";

export interface AppComment {
  id?: number;
  parent_id?: number;
  user: AppUser;
  message: string;
  deleted_at?: string;
  created_at?: string;
  children: AppComment[];
}
