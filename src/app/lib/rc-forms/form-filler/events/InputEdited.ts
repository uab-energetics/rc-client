export const INPUT_EDITED = 'rc.forms.inputs.edited'

export interface InputEdited {
  type: string
  payload: any
}

export const rcInputEdited = ({ key, data }): InputEdited => ({
  type: INPUT_EDITED,
  payload: {
    key,
    data
  }
})
