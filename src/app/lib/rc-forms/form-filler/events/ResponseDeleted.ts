export const RESPONSE_DELETED = 'rc.forms.input.deleted'

export interface ResponseDeleted {
  type: string
  payload: any
}

export const responseDelete = ({ key }): ResponseDeleted => ({
  type: RESPONSE_DELETED,
  payload: {
    key
  }
})
