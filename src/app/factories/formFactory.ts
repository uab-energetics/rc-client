

import {factory as category} from "./categoryFactory";
import * as _ from 'lodash';
import {AppForm} from "../models/AppForm";

export function factory (): AppForm {

  return {
    name: 'Form ' + _.random(0, 10000),
    published: false,
    type: "experiement",
    root_category: category(),
    description: 'Courage at the planet that is when harmless phenomenans view.',
  }
}
