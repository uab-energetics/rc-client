
import {AppBranch} from "./AppBranch";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  form_id: number;
  experiment_branches?: AppBranch[];
}
