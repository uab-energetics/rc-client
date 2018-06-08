import {RcFormMetaData} from "../RcFormMetaData";
import {FormEvent} from "../events/FormEvent";

export const formMetaData = (meta: RcFormMetaData, event: FormEvent): RcFormMetaData => {
  if(!meta) meta = {}

  return meta
}
