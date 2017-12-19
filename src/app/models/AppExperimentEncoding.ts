
import {AppBranch} from "./AppBranch";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  branches: AppBranch[];
}
