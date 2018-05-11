
import {AppBranch} from "../form-branch/AppBranch";
import {AppForm} from "../forms/AppForm";
import {User} from '../auth/models/User'

export interface AppExperimentEncoding {
  id?: number;
  name?: string;
  form_id: number;
  form?: AppForm;
  publication_id: number;
  owner?: User;
  experiment_branches?: AppBranch[];
  channel_name : string;
}
