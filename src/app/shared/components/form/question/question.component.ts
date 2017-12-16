import {Component, Input} from '@angular/core';
import {Question} from "../../../../models/Question";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input() questionModel: Question;
  @Input() observer: Subject<any>;


  /* CHANGE LISTENERS */

  selectChanged($event){
    this.notifyChange({
      sel: $event
    }, 'sel')
  }

  boolChanged($event){
    this.notifyChange({
      boo: $event
    }, 'boo')
  }

  textChanged($event){
    this.notifyChange({
      txt: $event
    }, 'txt')
  }

  numberChanged($event){
    this.notifyChange({
      num: $event
    }, 'num')
  }

  multiSelectChanged($event){
    this.notifyChange({
      selections: $event
    }, 'multi-sel')
  }

  /**
   * Emits the change event through the observer subject
   * @param payload - the portion of the response model that requires update
   * @param type - the response format this data should be interpreted as
   */
  private notifyChange( payload, type ){
    if(!this.observer) return;
    this.observer.next({
      question: this.questionModel,
      payload,
      type
    })
  }
}
