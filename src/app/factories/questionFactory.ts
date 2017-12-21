

import {AppQuestion} from "../models/AppQuestion";
import * as _ from 'lodash';
import {RESPONSE_FORMATS} from "../models/formats";

export function factory (): AppQuestion {

  return {
    name: 'Question ' + _.random(0, 10000),
    prompt: 'Desolation is a cloudy captain.',
    description: 'Courage at the planet that is when harmless phenomenans view.',
    options: [],
    accepts: [],
    default_format: RESPONSE_FORMATS.TEXT,
    true_option: 'Yes',
    false_option: 'No'
  }
}
