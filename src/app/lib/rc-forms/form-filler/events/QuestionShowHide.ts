export const QUESTION_SHOW_HIDE = 'rc.forms.meta.question-show-hide'

export interface QuestionShowHide {
  type: string
  payload: {
    key: string
    state: boolean
  }
}

export const questionShowHide = ({ key, state }): QuestionShowHide => ({
  type: QUESTION_SHOW_HIDE,
  payload: {
    key,
    state
  }
})
