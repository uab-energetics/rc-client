import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppBranch} from "../../../../models/AppBranch";
import {CategoryUpdate} from "../category/category.component";
import {AppCategory} from "../../../../models/AppCategory";
import {AppQuestion} from "../../../../models/AppQuestion";

export interface BranchUpdate {
  branch: AppBranch;
  category: AppCategory;
  question: AppQuestion;
  response: Response;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @Input() formModel: AppForm;
  @Input() branchModel: AppBranch;
  @Output() appBranchUpdate = new EventEmitter<BranchUpdate>();

  constructor() { }

  ngOnInit() {
  }

  onCategoryUpdate($event: CategoryUpdate){
    this.appBranchUpdate.emit(Object.assign($event, { branch: this.branchModel }))
  }

}
