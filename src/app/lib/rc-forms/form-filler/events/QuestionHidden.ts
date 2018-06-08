export const QUESTION_HIDDEN = 'rc.forms.meta.question-hidden'

export interface QuestionHidden {
  type: string
  payload: any
}

export const questionHidden = ({ key }): QuestionHidden => ({
  type: QUESTION_HIDDEN,
  payload: key
})
