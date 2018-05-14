
import {AppResponse} from "../form-responses/AppResponse";
import {AppQuestion} from "../form-questions/AppQuestion";

export interface AppBranch {
  id?: number;
  name: string;
  responses: AppResponse[];
  question_map?: AppQuestion[];
}
