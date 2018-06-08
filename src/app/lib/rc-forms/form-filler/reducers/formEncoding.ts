import {FormEvent} from "../events/FormEvent";
import {RESPONSE_UPDATED} from "../events/ResponseUpdated";
import * as lodash from "lodash";
import {RcFormEncoding} from "../types/RcFormEncoding";

export const formEncoding = (form: RcFormEncoding, event: FormEvent): RcFormEncoding => {
  if(!form) form = {}

  if(event.type === RESPONSE_UPDATED) {
    let copy = JSON.parse(JSON.stringify(form))
    lodash.set(copy, event.payload.key.split('.'), event.payload.data)
    return copy
  }

  return form
}
