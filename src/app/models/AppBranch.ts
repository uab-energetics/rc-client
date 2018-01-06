
import {AppResponse} from "./AppResponse";
import {AppQuestion} from "./AppQuestion";

export interface AppBranch {
  id?: number;
  name: string;
  responses: AppResponse[];
  question_map?: AppQuestion[];
}
