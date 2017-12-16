import {Form} from "../../../models/Form";
import {Category} from "../../../models/Category";
import {Question} from "../../../models/Question";

let id_counter = 0;

export function mapToTreeView(form: Form) {
  let root = mapCategory(form.root_category);
  return [root];
}

function mapCategory(category: Category){
  let children = [];
  category.questions.map(
    question => children.push(mapQuestion(question)));
  category.children.map(
    _category => children.push(mapCategory(_category)));

  return {
    id: (category.id || id_counter++),
    type: 'folder',
    name: category.name,
    children
  };
}

function mapQuestion(q: Question){
  return {
    id: (q.id || id_counter++),
    children: [],
    type: 'file',
    name: q.name
  };
}
