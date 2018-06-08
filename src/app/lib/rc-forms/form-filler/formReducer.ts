import {DynamicForm} from "./DynamicForm"
import {FormEvent} from "./events/FormEvent"
import {RESPONSE_UPDATED} from "./events/InputEdited"
import * as lodash from "lodash"

export const reduceForm = (form: DynamicForm, event: FormEvent): DynamicForm => {

  if(event.type === RESPONSE_UPDATED) {
    let copy = JSON.parse(JSON.stringify(form))
    lodash.set(copy, event.payload.key.split('.'), event.payload.data)
    return copy
  }

}
