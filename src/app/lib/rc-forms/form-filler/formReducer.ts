import {DynamicForm} from "./DynamicForm";
import {FormEvent} from "./events/FormEvent";
import {INPUT_EDITED} from "./events/InputEdited";
import * as lodash from "lodash";

export const reduceForm = (form: DynamicForm, event: FormEvent): DynamicForm => {

  if(event.type === INPUT_EDITED) {
    let copy = { ...form }
    lodash.set(copy, event.payload.key.split('.'), event.payload.data)
    return copy
  }

}
