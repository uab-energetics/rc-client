import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppQuestion} from "../../AppQuestion";
import {AppResponse} from '../../../../models/AppResponse';
import {RESPONSE_FORMATS} from '../../../../models/formats';

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
  @Input() responseData;
  @Input() question: AppQuestion;
  @Output() questionUpdate = new EventEmitter<QuestionUpdate>();

  fmt = RESPONSE_FORMATS;

  private emitResponseChange(responsePayload){
    this.questionUpdate.emit({
      key: this.key,
      response: Object.assign({}, this.responseData, responsePayload)
    });
  }

  ngOnInit(){
    console.log('question loaded..', this.responseData);
    if(!this.responseData) this.responseData = {
      type: this.question.default_format
    };
  }

  handleChange($event: AppResponse){
    this.emitResponseChange($event);
  }

  setType(type: string){
    this.responseData.type = type;
    this.handleChange(this.responseData);
  }

  toggleNotReported(){
    if(this.responseData.type === RESPONSE_FORMATS.NOT_REPORTED){
      this.setType(this.question.default_format);
    } else {
      this.setType(RESPONSE_FORMATS.NOT_REPORTED);
    }
  }

}
