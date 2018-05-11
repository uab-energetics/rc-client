import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {AppForm} from '../../../../models/AppForm'
import {CategoryUpdate} from '../category/category.component'
import {LoggerService} from '../../../logger.service'
import {AppBranch} from '../../../../models/AppBranch'
import {EncodingUpdate} from '../../../../pages/main/pub-coder/experiment-form/encodingReduce'

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @Input() key;
  @Input() branchData = {};
  @Input() branchModel: AppBranch;
  @Input() appForm: AppForm;
  @Output() appBranchUpdate = new EventEmitter<EncodingUpdate>();

  constructor(
    private log: LoggerService
  ) {}

  ngOnInit() {
    this.log.write('branch loaded: ', this.key, this.branchData, this.appForm)
  }

  getCategoryFormData() {
    return this.branchData['responses'] || {}
  }

  onCategoryUpdate($event: CategoryUpdate){
    this.appBranchUpdate.emit({
      branch_key: this.key,
      question_key: $event.key,
      branch: this.branchData,
      response: $event.response
    });
  }

  getQuestionData(question_key){
    return this.branchData['responses'][question_key] || null;
  }

}
