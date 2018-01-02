
import {AppResponse} from "./AppResponse";

export interface AppBranch {
  id?: number;
  index : number;
  name: string;
  responses: AppResponse[];
}
