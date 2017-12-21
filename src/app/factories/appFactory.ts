import {factory as question} from "./questionFactory";
import {factory as category} from "./categoryFactory";
import {factory as form} from "./formFactory";
import {factory as branch} from "./branchFactory";
import {factory as encoding} from "./encodingFactory";

let types = {};

types['form'] = form;
types['question'] = question;
types['branch'] = branch;
types['category'] = category;
types['encoding'] = encoding;

export function factory<T>(type: string, defaults: object = {}): T {
  let obj = types[type]() || {};
  return Object.assign(obj, defaults) as T;
}
