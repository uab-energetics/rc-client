
export enum AppNodeType {
  question = 'question',
  category = 'category'
}

export class AppTreeNode {
  treeID: string;
  id: number;
  type: AppNodeType;
  name: string;
  children: AppTreeNode[];
  isRoot?: boolean;

  constructor({ id, type, name, children = [], isRoot = false }){
    this.type = type;
    this.name = name;
    this.children = children;
    this.isRoot = isRoot;
    this.id = id;
    this.treeID = `${type}-${id}`;
  }

}
