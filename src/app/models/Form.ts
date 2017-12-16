
import { Category, makeCategory } from "./Category";

export interface Form {
  type: string;
  name: string;
  description: string;
  published: boolean;
  root_category?: Category;
}

export function makeForm ({
  type = 'experiment',
  name = 'Default Form',
  description = '',
  published = false
}, root_category = null): Form {
  if(!root_category) root_category = makeCategory({});
  return {
    type,
    name,
    description,
    published,
    root_category
  }
}
