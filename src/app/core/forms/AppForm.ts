
import {AppCategory, makeCategory} from "../form-categories/AppCategory";
import {AppQuestion} from "../form-questions/AppQuestion";
import { AppProjectForm } from "./AppProjectForm";

export interface AppForm {
  id?: number;
  type: string;
  name: string;
  description: string;
  questions?: AppQuestion[];
  published: boolean;
  root_category?: AppCategory;
  project_forms?: AppProjectForm[];
  pivot?: {repo_uuid: string}
}

/**
 * Factory Methods
 * ==========================
 */
export function makeForm ({
  type = 'experiment',
  name = 'Default Form',
  description = '',
  published = false
}, root_category = null): AppForm {
  if(!root_category) root_category = makeCategory({});
  return {
    type,
    name,
    description,
    published,
    root_category
  }
}
