import * as lodash from 'lodash'
import {RcFormData} from "./RcFormData";

export const lookup = (form: RcFormData, key: string, defaultValue = null): any =>
  lodash.get(form, key, defaultValue)
