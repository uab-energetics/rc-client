import {AppQuestion} from '../../AppQuestion';
import {AppCategory} from '../../../form-categories/AppCategory';
import {AppNodeType, AppTreeNode} from './dataModel';

let sourceMap;

export function mapToTreeNodes(rootCategory: AppCategory) {
  sourceMap = {
    'categories': {},
    'questions': {}
  };

  let root = mapCategory(rootCategory);
  root.isRoot = true;
  return {
    nodes: [root],
    sourceMap: sourceMap
  };
}

function mapCategory(category: AppCategory): AppTreeNode {
  let children = [];
  category.questions.map( question => children.push(mapQuestion(question)));
  category.children.map( _category => children.push(mapCategory(_category)));

  sourceMap['categories'][category.id] = category;
  return new AppTreeNode({
    id: category.id,
    type: AppNodeType.category,
    name: category.name,
    children
  });
}

function mapQuestion(question: AppQuestion){
  sourceMap['questions'][question.id] = question;
  return new AppTreeNode({
    id: question.id,
    type: AppNodeType.question,
    name: question.name
  });
}
