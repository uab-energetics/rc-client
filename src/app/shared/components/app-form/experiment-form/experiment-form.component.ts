import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form} from "../../../../models/Form";
import {AppBranch} from "../../../../models/Branch";
import {BranchUpdate} from "../branch/branch.component";
import {Category} from "../../../../models/Category";
import {Question} from "../../../../models/Question";

export interface ExperimentFormUpdate {
  form: Form;
  branch: AppBranch;
  category: Category;
  question: Question;
  response: Response;
}

@Component({
  selector: 'app-experiment-form',
  templateUrl: './experiment-form.component.html',
  styleUrls: ['./experiment-form.component.css']
})
export class ExperimentFormComponent implements OnInit {

  @Input() formModel: Form;
  @Input() branches: AppBranch[];
  @Output() appExperimentFormUpdate = new EventEmitter<ExperimentFormUpdate>();

  constructor() { }

  ngOnInit() {
  }

  onBranchUpdate($event: BranchUpdate){
    this.appExperimentFormUpdate.emit(Object.assign($event, { form: this.formModel }));
  }

}
