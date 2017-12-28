import {AppComment} from "./AppComment";

export interface AppChannel {
  id?: number;
  root_comment: AppComment;
  name: string;
  display_name: string;
  topic: string;
}
