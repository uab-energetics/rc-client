
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

function reduceBranch(state, update: EncodingUpdate){
  state = state || {};
  return Object.assign({}, state, update.branch, {
    responses: reduceResponses(state.responses, update.question_key, update.response)
  })
}

function reduceResponses(responses, question_key, response){
  responses = responses || {};
  return Object.assign({}, responses, {
    [question_key]: response
  })
}
