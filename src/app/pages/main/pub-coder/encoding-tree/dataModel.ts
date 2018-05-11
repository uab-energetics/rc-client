
export enum EncodingNodeType {
  root,
  branch,
  question
}

export class EncodingNode {
  id: number;
  type: EncodingNodeType;
  name: string;
  children: EncodingNode[];

  constructor({ id, type, name, children = [] }){
    this.type = type;
    this.name = name;
    this.children = children;
    this.id = id;
  }

}
