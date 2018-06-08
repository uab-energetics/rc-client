import {RcFormData} from "../types/RcFormData";
import {FormEvent} from "../events/FormEvent";
import {formEncoding} from "./formEncoding";
import {formMetaData} from "./formMetaData";

export const defaultValue: RcFormData = {
  meta: {},
  encoding: {}
}

export const reduceFormData = (formData: RcFormData, event: FormEvent): RcFormData => {
  if(!formData) formData = defaultValue
  return {
    encoding: formEncoding(formData.encoding, event),
    meta: formMetaData(formData.meta, event)
  }
}
