
import {AppBranch} from "./AppBranch";
import {AppUser} from "./AppUser";
import {AppForm} from "./AppForm";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  form_id: number;
  form?: AppForm;
  publication_id: number;
  owners?: AppUser[];
  experiment_branches?: AppBranch[];
  channel_name : string;
}
