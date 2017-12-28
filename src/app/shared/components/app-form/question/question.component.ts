import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppQuestion} from "../../../../models/AppQuestion";
import {AppResponse} from '../../../../models/AppResponse';

export interface QuestionUpdate {
  key,
  response: Response;
}

const MULTI_SELECT_PROP = "selections";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  /**
   * Uniquely identifies this question within the scope of the form
   */
  @Input() key;

  /**
   * Existing response data
   */
  @Input() responseData = {};
  @Input() question: AppQuestion;
  @Output() questionUpdate = new EventEmitter<QuestionUpdate>();

  private emitResponseChange(responsePayload){
    this.questionUpdate.emit({
      key: this.key,
      response: Object.assign({}, this.responseData, responsePayload)
    });
  }

  ngOnInit(){
    console.log('question loaded..', this.responseData);
    if(!this.responseData) this.responseData = {};
  }

  handleChange($event: AppResponse){
    this.emitResponseChange($event);
  }

}
