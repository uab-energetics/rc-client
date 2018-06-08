import * as lodash from 'lodash'

import {DynamicForm} from "./DynamicForm";

export const lookup = (form: DynamicForm, key: string, defaultValue = null) =>
  lodash.get(form, key, defaultValue)
