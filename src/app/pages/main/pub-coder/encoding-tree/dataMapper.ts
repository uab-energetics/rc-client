import {AppQuestion} from '../../../../models/AppQuestion';
import {EncodingNode, EncodingNodeType} from "./dataModel";
import {AppExperimentEncoding} from "../../../../models/AppExperimentEncoding";
import {AppBranch} from "../../../../models/AppBranch";

let sourceMap;

export const mapToEncodingNode = (encoding: AppExperimentEncoding) => {
  sourceMap = {
    'encoding': encoding,
    'branches': {},
    'questions': {}
  };

  return {
    nodes: [new EncodingNode({
      id: encoding.id,
      name: 'Encoding',
      type: EncodingNodeType.root,
      children: encoding.experiment_branches.map(mapBranch) as any
    })],
    sourceMap
  }
};

const mapBranch = (branch: AppBranch): EncodingNode => {
  sourceMap['branches'][branch.id] = branch;
  return new EncodingNode({
    name: branch.name,
    type: EncodingNodeType.branch,
    id: branch.id,
    children: branch.question_map.map(mapQuestion) as any
  })
};


const mapQuestion = (question: AppQuestion): EncodingNode => {
  sourceMap['questions'][question.id] = question;
  return new EncodingNode({
    name: question.name,
    type: EncodingNodeType.question,
    id: question.id
  });
};
