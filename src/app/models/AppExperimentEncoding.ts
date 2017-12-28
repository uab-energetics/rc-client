
import {AppBranch} from "./AppBranch";
import {AppUser} from "./AppUser";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  form_id: number;
  publication_id: number;
  owner?: AppUser;
  experiment_branches?: AppBranch[];
}
