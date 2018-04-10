
import {AppBranch} from "./AppBranch";
import {AppUser} from "./AppUser";
import {AppForm} from "./AppForm";
import {AppPublication} from "./AppPublication";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  form_id: number;
  form?: AppForm;
  publication_id: number;
  publication?: AppPublication;
  owners?: AppUser[];
  experiment_branches?: AppBranch[];
  channel_name : string;
}
