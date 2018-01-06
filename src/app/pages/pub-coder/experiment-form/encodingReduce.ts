
import {HashedBranch} from "../../conflicts/definitions";

export interface EncodingUpdate {
  branch_key,
  question_key,
  branch,
  response
}

export function reduceEncoding(encoding, update: EncodingUpdate) {
  encoding = encoding || {};
  return Object.assign({}, encoding, {
    [update.branch_key]: reduceBranch(encoding[update.branch_key], update)
  })
}

export function reduceBranch(branch, update: EncodingUpdate){
  branch = branch || {};
  return Object.assign({}, branch, update.branch, {
    responses: reduceResponses(branch.responses, update.question_key, update.response)
  })
}


export function reduceResponses(responses, question_key, response){
  responses = responses || {};
  return Object.assign({}, responses, {
    [question_key]: response
  })
}
