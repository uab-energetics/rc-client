import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppExperimentEncoding} from "../../../../models/AppExperimentEncoding";
import * as _ from 'lodash';
import {AppBranch} from "../../../../models/AppBranch";
import {EncodingUpdate, reduceEncoding} from "./encodingReduce";
import {mapToFormData} from "./encodingMapper";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent implements OnInit {

  @Input() appForm: AppForm;
  @Input() encoding: AppExperimentEncoding;

  @Output() saveResponses = new EventEmitter();
  @Output() onDeleteBranch = new EventEmitter<number>();
  @Output() onCreateBranch = new EventEmitter<object>();

  branches = [];
  originalData = {};
  changedData = {};

  constructor(
    private notify: NotifyService
  ){}

  ngOnInit() {
    this.loadData(this.encoding);
  }


  /**
   * ===============================
   * DATA METHODS
   * ===============================
   */
  loadData(encoding: AppExperimentEncoding): void {
    encoding.experiment_branches.forEach(b => this.branches.push(b));
    this.originalData = mapToFormData(encoding);
    console.log(this.originalData);
  }

  exportResponses(): object[] {
    let _responses = [];
    for(let [branch_id, branch] of Object.entries(this.changedData)){
      for(let [question_id, response] of Object.entries(branch['responses'])){
        _responses.push(Object.assign(
          {},
          response,
          { branch_id: branch_id },
          { question_id: question_id }))
      }
    }
    return _responses;
  }


  /**
   * ===============================
   * EVENT HANDLERS
   * ===============================
   */
  newBranch(){
    let branchName = this.notify.prompt("Give the new branch a name:");
    this.onCreateBranch.emit({name: branchName});
  }

  deleteBranch(branch){
    let afterConfirm = () => {
      this.onDeleteBranch.emit(branch.id);
    };
    this.notify.confirm(afterConfirm);
  }

  onResponseChanged($event: EncodingUpdate): void {
    this.changedData = reduceEncoding(this.changedData, $event);
  }


  /**
   * ===============================
   * HELPERS
   * ===============================
   */
  private getBranchData(branch_key): object {
    return this.originalData[branch_key] || {};
  }
}
