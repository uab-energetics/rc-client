import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {BranchUpdate} from "../branch/branch.component";
import {AppExperimentEncoding} from "../../../../models/AppExperimentEncoding";
import * as _ from 'lodash';

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent implements OnInit {

  @Input() appForm: AppForm;
  @Input() encoding: AppExperimentEncoding;
  @Output() appExperimentFormUpdate = new EventEmitter();

  formModel = {};

  ngOnInit() {
  }

  onBranchUpdate($event: BranchUpdate){
    this.appExperimentFormUpdate.emit($event);
    console.log('from branch: ', $event);

    let update = {
      branches: {
        [$event.branch_key]: {
          responses: {
            [$event.question_key]: $event.response
          }
        }
      }
    };
    _.mergeWith(this.formModel, update);
    this.appExperimentFormUpdate.emit(this.formModel);
  }

}
