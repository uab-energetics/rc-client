import {AppExperimentEncoding} from "../encodings/AppExperimentEncoding";
import {AppPublication} from "../publications/AppPublication";
import {AppForm} from "../forms/AppForm";

export interface AppEncodingTask {
  id: number,
  encoding_id: number,
  encoding?: AppExperimentEncoding,
  publication_id: number,
  publication?: AppPublication,
  form_id: number,
  form: AppForm,
  active: boolean,
  complete: boolean,
  status?: string,
}
