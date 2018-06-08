import {RcFormData} from "../RcFormData";
import {FormEvent} from "../events/FormEvent";
import {formEncoding} from "./formEncoding";
import {formMetaData} from "./formMetaData";

const defaultValue: RcFormData = {
  meta: {},
  encoding: {}
}

export const reduceFormData = (formData: RcFormData, event: FormEvent): RcFormData => {
  if(!formData) formData = defaultValue
  console.log(formData)
  return {
    encoding: formEncoding(formData.encoding, event),
    meta: formMetaData(formData.meta, event)
  }
}
