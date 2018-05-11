import {AppComment} from "../comments/AppComment";

export interface AppChannel {
  id?: number;
  root_comment: AppComment;
  name: string;
  display_name: string;
  topic: string;
}
