import {AppForm} from "./AppForm";
import {AppProject} from "./AppProject";

export interface AppProjectForm {
  id: number,
  form: AppForm,
  project: AppProject,
  task_target_publication?: number,
  task_target_encoder?: number,
}