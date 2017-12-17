
import {AppBranch} from "./Branch";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  branches: AppBranch[];
}
