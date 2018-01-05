import {AppQuestion} from '../../../models/AppQuestion';
import {AppCategory} from '../../../models/AppCategory';
import {AppNodeType, AppTreeNode} from './dataModel';
import {type} from "os";

export function mapToTreeNodes(rootCategory: AppCategory): AppTreeNode[] {
  let root = mapCategory(rootCategory);
  root.isRoot = true;
  return [root];
}

function mapCategory(category: AppCategory): AppTreeNode {
  let children = [];
  category.questions.map( question => children.push(mapQuestion(question)));
  category.children.map( _category => children.push(mapCategory(_category)));

  return new AppTreeNode({
    id: category.id,
    type: AppNodeType.category,
    name: category.name,
    children
  });
}

function mapQuestion(question: AppQuestion){
  return new AppTreeNode({
    id: question.id,
    type: AppNodeType.question,
    name: question.name
  });
}
