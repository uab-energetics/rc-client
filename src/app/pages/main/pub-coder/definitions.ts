

import {EncodingNode} from "./encoding-tree/dataModel";
import {AppExperimentEncoding} from "../../../core/encodings/AppExperimentEncoding";

export interface State {

  encoding: AppExperimentEncoding;
  activeNode: EncodingNode;


}
