import {AppPublication} from "../publications/AppPublication";

export interface AppFormPublication {
  id?: number;
  priority : number
  publication: AppPublication,
}
