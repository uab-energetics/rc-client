

import * as _ from 'lodash';
import {AppBranch} from "../models/AppBranch";

export function factory (): AppBranch {

  return {
    name: 'Branch ' + _.random(0, 10000),
    responses: []
  }
}
