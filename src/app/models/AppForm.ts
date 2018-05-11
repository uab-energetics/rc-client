
import {AppCategory, makeCategory} from "../core/form-categories/AppCategory";
import {AppQuestion} from "../core/form-questions/AppQuestion";

export interface AppForm {
  id?: number;
  type: string;
  name: string;
  description: string;
  questions?: AppQuestion[];
  published: boolean;
  root_category?: AppCategory;
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
