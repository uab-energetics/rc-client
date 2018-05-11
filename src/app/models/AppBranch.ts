
import {AppResponse} from "./AppResponse";
import {AppQuestion} from "../core/form-questions/AppQuestion";

export interface AppBranch {
  id?: number;
  name: string;
  responses: AppResponse[];
  question_map?: AppQuestion[];
}
