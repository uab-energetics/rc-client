
export function exportResponses(formData: object){
  let _responses = [];
  for (let [branch_id, branch] of Object.entries(formData)) {
    for (let [question_id, response] of Object.entries(branch['responses'])) {
      _responses.push(Object.assign(
        {},
        response,
        {branch_id: branch_id},
        {question_id: question_id}))
    }
  }
  return _responses;
}
