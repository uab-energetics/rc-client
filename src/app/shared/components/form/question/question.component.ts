import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../../../models/Question";
import {RESPONSE_FORMATS as fmt} from "../../../../models/formats";

export interface ResponseUpdate {
  type: string;
  question: Question;
  payload;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input() questionModel: Question;
  @Output() appResponseChange = new EventEmitter<ResponseUpdate>();

  private emitResponseChange(responsePayload, type){
    this.appResponseChange.emit({
      question: this.questionModel,
      payload: responsePayload,
      type
    });
  }

  /* CHANGE LISTENERS */

  selectChanged($event){
    this.emitResponseChange({
      [fmt.SELECT]: $event
    }, fmt.SELECT);
  }

  boolChanged($event){
    this.emitResponseChange({
      [fmt.BOOLEAN]: $event
    }, fmt.BOOLEAN);
  }

  textChanged($event){
    this.emitResponseChange({
      [fmt.TEXT]: $event
    }, fmt.TEXT);
  }

  numberChanged($event){
    this.emitResponseChange({
      [fmt.NUMBER]: $event
    }, fmt.NUMBER);
  }

  multiSelectChanged($event){
    this.emitResponseChange({
      [fmt.MULTI_SELECT]: $event
    }, fmt.MULTI_SELECT);
  }

}
