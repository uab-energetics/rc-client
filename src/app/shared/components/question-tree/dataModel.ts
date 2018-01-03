let idCounter = 0;

export enum AppNodeType {
  question = 'question',
  category = 'category'
}

export class AppTreeNode {
  type: AppNodeType;
  name: string;
  children: AppTreeNode[];
  isRoot?: boolean;

  constructor({ id, type, name, children = [], isRoot = false }){
    this.id = id;
    this.type = type;
    this.name = name;
    this.children = children;
    this.isRoot = isRoot;
  }


  /* ensure unique ID across tables */
  /* encodes the ID like so..
  *
  *     <unique prefix among all nodes>:actual
  *
  * */
  private _id: string;
  get id(): number {
    return +this._id.split(":")[1];
  }
  set id(id: number) {
    this._id = [idCounter++, id].join(":");
  }

}
