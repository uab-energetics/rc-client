import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {BranchUpdate} from "../branch/branch.component";
import {AppExperimentEncoding} from "../../../../models/AppExperimentEncoding";
import * as _ from 'lodash';
import {AppBranch} from "../../../../models/AppBranch";

let cnt = 0;
let Keys = {
  next: () => ++cnt
};

let recordBranch = (b, e) => {
  let key = Keys.next();
  e[key] = _.pick(b, 'name');
  return key;
};

let recordResponse = (r, b) => {
  let key = r.question_id;
  b[key] = r;
  return key;
};

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent implements OnInit {

  @Input() appForm: AppForm;
  @Input() encoding: AppExperimentEncoding;
  @Output() appExperimentFormUpdate = new EventEmitter();

  formModel = {
    branches: []
  };
  originalData = {};
  changedData = {};

  ngOnInit() {
    this.loadData(this.encoding);
  }

  newBranch(){
    let branchFormModel = {
      _key: Keys.next(),
      name: 'New Branch '
    };
    this.formModel.branches.push(branchFormModel);
  }

  getBranchData(branch_key){
    return this.originalData[branch_key] || {};
  }

  onBranchUpdate($event: BranchUpdate) {
    this.appExperimentFormUpdate.emit($event);

    let update = {
      [$event.branch_key]: {
        [$event.question_key]: $event.response
      }
    };

    _.mergeWith(this.changedData, update);
    this.appExperimentFormUpdate.emit(this.exportData());
  }

  private exportData(): AppBranch[] {
    let branches = [];
    for(let [bkey, bval] of Object.entries(this.changedData)){
      let branch: AppBranch = {
        name: bval['name'],
        responses: []
      };
      for(let [qkey, qval] of Object.entries(bval)){
        let response = qval;
        response.question_id = qkey;
        branch.responses.push(response);
      }
      branches.push(branch);
    }
    return branches;
  }

  private loadData(encoding: AppExperimentEncoding){
    let _encoding = {};
    let e = this.encoding;
    e.branches.forEach( b => {
      let branch_key = recordBranch(b, _encoding);
      let branchFormModel = {
        _key: branch_key,
        name: b.name
      };
      this.formModel.branches.push(branchFormModel);
      b.responses.forEach( r => {
        let res_key = recordResponse(r, _encoding[branch_key]);
      });
    });
    this.originalData = _encoding;
  }
}
