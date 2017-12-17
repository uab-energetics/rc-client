import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form} from "../../../../models/Form";
import {AppBranch} from "../../../../models/Branch";
import {CategoryUpdate} from "../category/category.component";
import {Category} from "../../../../models/Category";
import {Question} from "../../../../models/Question";

export interface BranchUpdate {
  branch: AppBranch;
  category: Category;
  question: Question;
  response: Response;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @Input() formModel: Form;
  @Input() branchModel: AppBranch;
  @Output() appBranchUpdate = new EventEmitter<BranchUpdate>();

  constructor() { }

  ngOnInit() {
  }

  onCategoryUpdate($event: CategoryUpdate){
    this.appBranchUpdate.emit(Object.assign({}, $event, { branch: this.branchModel }))
  }

}
