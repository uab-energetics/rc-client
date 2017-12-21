import {AppForm} from "../../../models/AppForm";
import {AppCategory} from "../../../models/AppCategory";
import {AppQuestion} from "../../../models/AppQuestion";

let id_counter = 1;

export function mapToTreeView(form: AppForm) {
  let root = mapCategory(form.root_category);
  root['isRoot'] = true;
  return [root];
}

export function encodeID(id: number): string {
  return ++id_counter + "-" + id;
}

export function decodeID(id: string): number {
  return +id.match(/-(.*)/)[1];
}

function mapCategory(category: AppCategory){
  let children = [];
  category.questions.map(
    question => children.push(mapQuestion(question)));
  category.children.map(
    _category => children.push(mapCategory(_category)));

  return {
    id: encodeID(category.id),
    type: 'folder',
    name: category.name,
    children
  };
}

function mapQuestion(q: AppQuestion){
  return {
    id: encodeID(q.id),
    children: [],
    type: 'file',
    name: q.name
  };
}
