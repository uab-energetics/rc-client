import * as _ from 'lodash';
import {AppExperimentEncoding} from "../models/AppExperimentEncoding";

export function factory (): AppExperimentEncoding {

  return {
    id: _.random(0, 10000),
    name: 'Encoding ' + _.random(0, 10000),
    form_id: _.random(0, 1000),
    experiment_branches: []
  }
}
