import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppQuestion} from "../../../../models/AppQuestion";
import {RESPONSE_FORMATS as fmt} from "../../../../models/formats";

export interface QuestionUpdate {
  key,
  response: Response;
}

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
    console.log('question loaded', this.responseData);
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

  /* loaders */

  getMultiSelect(){
    return this.responseData['multi-sel'] || [];
  }

  getText(){
    return this.responseData['txt'] || '';
  }

  getBoo(){
    return this.responseData['boo'] || null;
  }

  getSel(){
    return this.responseData['sel'] || '';
  }

  getNum(){
    return this.responseData['num'] || null;
  }

}
