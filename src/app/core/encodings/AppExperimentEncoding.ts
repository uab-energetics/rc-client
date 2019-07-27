import {AppBranch} from "../form-branch/AppBranch";
import {AppForm} from "../forms/AppForm";
import {User} from '../auth/user.model';
import {AppPublication} from "../publications/AppPublication";

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  form_id: number;
  form?: AppForm;
  publication_id: number;
  publication?: AppPublication;
  owners?: User[];
  experiment_branches?: AppBranch[];
  channel_name : string;
}
