import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppQuestion} from "../../../../models/AppQuestion";
import {RESPONSE_FORMATS as fmt} from "../../../../models/formats";

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
      [MULTI_SELECT_PROP]: $event
    });
  }

  /* loaders */

  getMultiSelect(){
    return this.responseData[MULTI_SELECT_PROP] || [];
  }

  getText(){
    return this.responseData[fmt.TEXT] || '';
  }

  getBoo(){
    return this.responseData[fmt.BOOLEAN] || null;
  }

  getSel(){
    return this.responseData[fmt.SELECT] || '';
  }

  getNum(){
    return this.responseData[fmt.NUMBER] || null;
  }

}
