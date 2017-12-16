
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


/**
 * Operational Methods
 * ===========================
 */
interface DFSResult {
  path: Category[];
  node: Category | Question;
  type: 'question' | 'category';
}

/**
 * Run Depth-First-Search on the form object to find a given node.
 * @param {Form} form - the form to search
 * @param {number} search_id - the ID of the node to search for
 * @returns {DFSResult} - the response data
 */
export function form_dfs(form: Form, search_id: number): DFSResult | null {
  return _dfs(search_id, form.root_category, []);
}

function _dfs(search_id: number, category: Category, path): DFSResult | null {
  path.push(category);

  if(category.id === search_id)
    return { node: category, path, type: 'category' };

  for(let qi = 0; qi < category.questions.length; qi++) {
    let q = category.questions[qi];
    if (q.id === search_id) {
      path.push(q);
      return {node: category.questions[qi], path, type: 'question'};
    }
  }

  for(let i = 0; i < category.children.length; i++){
    let next = _dfs(search_id, category.children[i], path);
    if(next !== null) return next;
  }

  path.pop();
  return null;
}


/**
 * Moves a node to a new parent category
 *
 */
export function form_move(form, new_parent_id, child_id){
  // detach child from current parent.
  let searchResults = form_dfs(form, child_id);
  let child = searchResults.node;
  let child_type = searchResults.type;

  if(!searchResults){
    console.log('cannot move. child not found');
    return;
  }

  let currentParent = searchResults.path[searchResults.path.length-2];
  let newParent: any = form_dfs(form, new_parent_id).node;
  switch (child_type){
    case "question":
      _.pull(currentParent.questions, child);
      newParent.questions.push(child);
      return;
    case "category":
      _.pull(currentParent.children, child);
      newParent.children.push(child);
      return;
  }
}

export function form_add(form: Form, parent: Category, node, type: "question" | "category"): Form {
  switch (type){
    case "question": parent.questions.push(node); return form;
    case "category": parent.children.push(node); return form;
  }
  return form;
}
