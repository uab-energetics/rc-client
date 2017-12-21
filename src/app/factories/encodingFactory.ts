

import {AppQuestion} from "../models/AppQuestion";
import * as _ from 'lodash';
import {RESPONSE_FORMATS} from "../models/formats";
import {AppExperimentEncoding} from "../models/AppExperimentEncoding";

export function factory (): AppExperimentEncoding {

  return {
    id: _.random(0, 10000),
    name: 'Encoding ' + _.random(0, 10000),
    form_id: _.random(0, 1000),
    branches: []
  }
}


function randomEncoding(){

}
