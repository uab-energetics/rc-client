import {AppForm} from "../../../../core/forms/AppForm";


export const exportToJSON = (form: AppForm): string => {
  return JSON.stringify(form, null, 2)
}
