

import {EncodingNode} from "./encoding-tree/dataModel";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";

export interface State {

  encoding: AppExperimentEncoding;
  activeNode: EncodingNode;


}
