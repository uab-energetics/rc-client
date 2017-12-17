
import { Category, makeCategory } from "./Category";
import {Question} from "./Question";

import * as _ from "lodash";

export interface Form {
  type: string;
  name: string;
  description: string;
  published: boolean;
  root_category?: Category;
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
