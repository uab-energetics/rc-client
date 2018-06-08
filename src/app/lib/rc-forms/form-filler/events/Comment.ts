export const COMMENT = 'rc.forms.meta.comment'

export interface Comment {
  type: string
  payload: {
    key: string
    comment: string
  }
}

export const leaveComment = ({ key, comment }): Comment => ({
  type: COMMENT,
  payload: {
    key,
    comment
  }
})
