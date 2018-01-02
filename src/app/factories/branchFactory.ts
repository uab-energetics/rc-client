 import * as _ from 'lodash';
import {AppBranch} from "../models/AppBranch";
import {factory as resp} from "./responseFactory";

export function factory (): AppBranch {

  let responses = [];
  let cnt = _.random(0, 3);
  while(cnt--){
    responses.push(resp())
  }

  return {
    name: 'Branch ' + _.random(0, 10000),
    index : 0,
    responses
  }
}
