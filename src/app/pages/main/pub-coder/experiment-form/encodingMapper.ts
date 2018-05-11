import {AppExperimentEncoding} from "../../../../models/AppExperimentEncoding";


/*=================================================
 *  FORM MODEL
 *  {
 *    branches: [],
 *    form: {
 *      root: {
 *        questions: [{}],
 *        children: [{}]
 *      }
 *    }
 *  }
 *
 *  DATA MODEL
 *  {
 *    [branch_id]: {
 *      [question_id]: response
 *    }
 *  }
 *=================================================/







/**
 * Creates the form model, AND the form data mapping from and existing encoding.
 * _NOTE_: all branches require an id.
 * @param {AppExperimentEncoding} encoding
 */
export function mapToFormData(encoding: AppExperimentEncoding){
  let formData = {};
  encoding.experiment_branches.forEach( branch => {
    let _responses = {};
    branch.responses.forEach( response =>
      _responses[response.question_id] = response);
    formData[branch.id] = Object.assign({}, branch, { responses: _responses });
  });
  return formData;
}
