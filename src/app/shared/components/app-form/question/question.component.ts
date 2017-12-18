import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../../../models/Question";
import {RESPONSE_FORMATS as fmt} from "../../../../models/formats";

export interface ResponseUpdate {
  question: Question;
  response: Response;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input() questionModel: Question;
  @Output() appResponseChange = new EventEmitter<ResponseUpdate>();

  private emitResponseChange(responsePayload){
    this.appResponseChange.emit({
      question: this.questionModel,
      response: responsePayload
    });
  }

  /* CHANGE LISTENERS */

  selectChanged($event){
    this.emitResponseChange({
      type: fmt.SELECT,
      [fmt.SELECT]: $event
    });
  }

  boolChanged($event){
    this.emitResponseChange({
      type: fmt.BOOLEAN,
      [fmt.BOOLEAN]: $event
    });
  }

  textChanged($event){
    this.emitResponseChange({
      type: fmt.TEXT,
      [fmt.TEXT]: $event
    });
  }

  numberChanged($event){
    this.emitResponseChange({
      type: fmt.NUMBER,
      [fmt.NUMBER]: $event
    });
  }

  multiSelectChanged($event){
    this.emitResponseChange({
      type: fmt.MULTI_SELECT,
      [fmt.MULTI_SELECT]: $event
    });
  }

}
