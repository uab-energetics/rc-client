import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppBranch} from "../../../../models/AppBranch";
import {CategoryUpdate} from "../category/category.component";
import {AppCategory} from "../../../../models/AppCategory";
import {AppQuestion} from "../../../../models/AppQuestion";
import * as _ from 'lodash';
import {LoggerService} from "../../../logger.service";

export interface BranchUpdate {
  branch_key,
  question_key,
  response
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @Input() key;
  @Input() branchForm;
  @Input() branchData = {};
  @Input() appForm: AppForm;
  @Output() appBranchUpdate = new EventEmitter<BranchUpdate>();

  constructor(
    private log: LoggerService
  ) {}

  ngOnInit() {
    this.log.write('branch loaded: ', this.key, this.branchData, this.appForm)
  }

  onCategoryUpdate($event: CategoryUpdate){
    this.appBranchUpdate.emit({
      branch_key: this.key,
      question_key: $event.key,
      response: $event.response
    });
  }

}
