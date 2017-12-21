
import {AppResponse} from "./AppResponse";

export interface AppBranch {
  id?: number;
  name: string;
  responses: AppResponse[];
}
