import {User} from '../auth/user.model'

export interface AppComment {
  id?: number;
  parent_id?: number;
  user: User;
  message: string;
  deleted_at?: string;
  created_at?: string;
  children: AppComment[];
}
