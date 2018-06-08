import {RcFormMetaData} from "../types/RcFormMetaData"
import {FormEvent} from "../events/FormEvent"
import {RESPONSE_UPDATED} from "../events/ResponseUpdated";
import {QUESTION_SHOW_HIDE} from "../events/QuestionShowHide";
import {QUESTION_REPORTED} from "../events/QuestionReported";
import {QuestionMetaData} from "../types/QuestionMetaData";
import {COMMENT} from "../events/Comment";


const defaultMetaData: QuestionMetaData = {
  visible: true,
  reported: true,
  comments: []
}

export const formMetaData = (meta: RcFormMetaData, event: FormEvent): RcFormMetaData => {
  if(!meta) meta = {}

  const reduceMeta = key => reducer => ({
    ...meta, [key]: reducer(meta[key] || defaultMetaData)
  })

  if(event.type === QUESTION_SHOW_HIDE)
    return reduceMeta(event.payload.key)((questionMeta) => ({ ...questionMeta, visible: event.payload.state }))

  if(event.type === QUESTION_REPORTED)
    return reduceMeta(event.payload.key)((questionMeta) => ({ ...questionMeta, reported: event.payload.state }))

  if(event.type === RESPONSE_UPDATED)
    return reduceMeta(event.payload.key)((meta) => meta)

  if(event.type === COMMENT)
    return reduceMeta(event.payload.key)(meta => ({ ...meta, comments: [ ...meta.comments, event.payload.comment ] }))

  return meta
}
