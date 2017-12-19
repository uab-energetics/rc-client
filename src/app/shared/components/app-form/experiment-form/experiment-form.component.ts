import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppBranch} from "../../../../models/AppBranch";
import {BranchUpdate} from "../branch/branch.component";
import {AppCategory} from "../../../../models/AppCategory";
import {AppQuestion} from "../../../../models/AppQuestion";

export interface ExperimentFormUpdate {
  form: AppForm;
  branch: AppBranch;
  category: AppCategory;
  question: AppQuestion;
  response: Response;
}

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent implements OnInit {

  @Input() formModel: AppForm;
  @Input() branches: AppBranch[];
  @Output() appExperimentFormUpdate = new EventEmitter<ExperimentFormUpdate>();

  constructor() { }

  ngOnInit() {
  }

  onBranchUpdate($event: BranchUpdate){
    this.appExperimentFormUpdate.emit(Object.assign($event, { form: this.formModel }));
  }

}
