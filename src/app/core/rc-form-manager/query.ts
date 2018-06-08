import * as lodash from 'lodash'

import {DynamicForm} from "./DynamicForm";

export const lookup = (form: DynamicForm, key: string) => lodash.get(form, key, null)
