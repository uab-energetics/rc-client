import { Component, OnInit } from '@angular/core';
import {FormService} from "../../shared/services/form/form.service";
import {AppForm} from "../../models/AppForm";
import {ExperimentFormUpdate} from "../../shared/components/app-form/experiment-form/experiment-form.component";
import {EncodingService} from "../../shared/services/encoding.service";
import * as _ from 'lodash';
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {buildMockForm} from "../../shared/services/form/mock-form.service";

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  formModel: AppForm;
  originalEncoding: AppExperimentEncoding = null;
  encodingModel = {};

  formCompletion: number = 0;

  constructor(
    private formService: FormService,
    private encodingService: EncodingService
  ) { }

  ngOnInit() {
    this.encodingService.getEncoding(5555)
      .then(
        (encoding: AppExperimentEncoding) => {
          console.log(encoding);
          this.encodingModel = encoding;
          this.formService.getForm(encoding.form_id).toPromise()
            .catch( err => {
              return buildMockForm();
            })
            .then(
              (form: AppForm) => {
                this.formModel = form;
                console.log(this.formModel);
              }
            )
        }
      )
  }

  onFormUpdate($event: ExperimentFormUpdate){
    let update = {
      branches: [

      ]
    };
    this.encodingModel = _.mergeWith(this.encodingModel, update);
    this.formCompletion = this.encodingService.calculateCompletion(this.formModel, this.encodingModel);
  }

}

function buildEncodingModel( encoding: AppExperimentEncoding ){
  let model = Object.assign({}, encoding, { branches: [] });
  // for each branch
  encoding.branches.forEach( branch => {
    model.branches.push(Object.assign({}, branch, { responses: [] }));
    branch.responses.forEach( resp => {
      model.branches[branch.id][resp.id] = Object.assign({}, resp);
    });
  });
  // for each response
  return model;
}
