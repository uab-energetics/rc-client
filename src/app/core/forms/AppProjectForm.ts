import {AppForm} from "./AppForm";
import {AppProject} from "../projects/AppProject";

export interface AppProjectForm {
  id: number,
  form: AppForm,
  project: AppProject,
  repo_uuid: string,
  task_target_publication?: number,
  task_target_encoder?: number,
}
