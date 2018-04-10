import {AppExperimentEncoding} from "./AppExperimentEncoding";

export interface AppEncodingTask {
  id: number,
  encoding_id: number,
  encoding?: AppExperimentEncoding,
  active: boolean,
  complete: boolean
}
