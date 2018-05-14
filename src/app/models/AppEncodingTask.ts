import {AppExperimentEncoding} from "../core/encodings/AppExperimentEncoding";

export interface AppEncodingTask {
  id: number,
  encoding_id: number,
  encoding?: AppExperimentEncoding,
  active: boolean,
  complete: boolean
}
