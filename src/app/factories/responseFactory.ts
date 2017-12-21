
import {AppCategory} from "../models/AppCategory";

import * as _ from 'lodash';
import {AppResponse} from "../models/AppResponse";

export function factory(): AppResponse {
  return {
    id: _.random(0, 10000),
    question_id: _.random(0, 100),
    type: ['num', 'txt', 'sel'][_.random(0, 2)],
    num: 12,
    sel: 'Salvus cottas ducunt',
    txt: "Secret places of vision will oddly forget a unconditional thing.",
  }
}
