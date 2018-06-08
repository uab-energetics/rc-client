export const RESPONSE_UPDATED = 'rc.forms.input.updated'

export interface ResponseUpdated {
  type: string
  payload: any
}

export const responseUpdated = ({ key, data }): ResponseUpdated => ({
  type: RESPONSE_UPDATED,
  payload: {
    key,
    data
  }
})
