import {AppExperimentEncoding} from "../core/encodings/AppExperimentEncoding";
import {AppPublication} from "../core/publications/AppPublication";
import {AppForm} from "../core/forms/AppForm";

export interface AppEncodingTask {
  id: number,
  encoding_id: number,
  encoding?: AppExperimentEncoding,
  publication_id: number,
  publication?: AppPublication,
  form_id: number,
  form: AppForm,
  active: boolean,
  complete: boolean
}
