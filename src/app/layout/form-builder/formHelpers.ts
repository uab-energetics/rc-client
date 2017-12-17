import {Category} from "../../models/Category";
import {Question} from "../../models/Question";
import {Form} from "../../models/Form";
import * as _ from 'lodash';

interface DFSResult {
  path: Category[];
  node;
  type: 'question' | 'category';
}

export const FormNodeTypes = {
  CATEGORY: 'category',
  QUESTION: 'question'
};

/**
 * Run Depth-First-Search on the form object to find a given node.
 * @param {Form} form - the form to search
 * @param {number} search_id - the ID of the node to search for
 * @returns {DFSResult} - the response data
 */
export function find(form: Form, search_id: number): DFSResult | null {
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

export function move(form, new_parent_id, child_id){
  // detach child from current parent.
  let child_rs = find(form, child_id);
  let parent_rs = find(form, new_parent_id);
  if(!child_rs || !parent_rs) return;                     // both nodes must exist
  if(parent_rs.type !== FormNodeTypes.CATEGORY) return;   // parent node must be category

  let currentParent = child_rs.path[child_rs.path.length-2];
  let targetParent: any = parent_rs.node;
  switch (child_rs.type){
    case FormNodeTypes.QUESTION:
      _.pull(currentParent.questions, child_rs.node);
      targetParent.questions.push(child_rs.node);
      return Object.assign({}, form);
    case FormNodeTypes.CATEGORY:
      _.pull(currentParent.children, child_rs.node);
      targetParent.children.push(child_rs.node);
      return Object.assign({}, form);
  }
}

function deleteNode(form: Form, node_id: number){
  let rs = find(form, node_id);
  if(!rs) return;
}


function addCategory(form: Form, parent: Category, node: Category): Form {
  parent.children.push(node);
  return Object.assign({}, form);
}

function addQuestion(form: Form, parent: Category, node: Question): Form {
  parent.questions.push(node);
  return Object.assign({}, form);
}

function removeCategory(form: Form, parent: Category, node: Category): Form {
  _.pull(parent.children, node);
  return Object.assign({}, form);
}

function removeQuestion(form: Form, parent: Category, node: Question): Form {
  _.pull(parent.questions, node);
  return Object.assign({}, form);
}

export const Forms = {
  find,
  move,
  addCategory,
  addQuestion,
  removeQuestion,
  removeCategory
};
