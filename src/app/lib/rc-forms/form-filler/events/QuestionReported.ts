export const QUESTION_REPORTED = 'rc.forms.meta.question-reported'

export interface QuestionReported {
  type: string
  payload: {
    key: string
    state: boolean
  }
}

export const questionReported = ({ key, state }): QuestionReported => ({
  type: QUESTION_REPORTED,
  payload: {
    key,
    state
  }
})
