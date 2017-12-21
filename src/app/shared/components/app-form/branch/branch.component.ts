import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppBranch} from "../../../../models/AppBranch";
import {CategoryUpdate} from "../category/category.component";
import {AppCategory} from "../../../../models/AppCategory";
import {AppQuestion} from "../../../../models/AppQuestion";
import * as _ from 'lodash';

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
  @Input() appForm: AppForm;
  @Input() appBranch: AppBranch;
  @Output() appBranchUpdate = new EventEmitter<BranchUpdate>();

  ngOnInit() {
  }

  onCategoryUpdate($event: CategoryUpdate){
    this.appBranchUpdate.emit({
      branch_key: this.key,
      question_key: $event.key,
      response: $event.response
    });
  }

}
