
import {AppCategory} from "../models/AppCategory";

import * as _ from 'lodash';

export function factory(): AppCategory {

  let name = "Category " + _.random(0, 10000);

  return {
    name: name,
    description: 'Abactus de emeritis armarium, aperto orgia!',
    questions: [],
    children: []
  }
}
