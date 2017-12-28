import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppCategory} from "../../../../models/AppCategory";
import {QuestionUpdate} from "../question/question.component";
import {LoggerService} from "../../../logger.service";

export interface CategoryUpdate {
  key;
  response: Response;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  /**
   * Used to distribute existing responses to questions
   */
  @Input() formData = {};

  @Input() root = false;
  @Input() category: AppCategory;
  @Output() appCategoryUpdate = new EventEmitter<CategoryUpdate>();

  onQuestionChange($event: QuestionUpdate){
    this.appCategoryUpdate.emit($event);
    // this.recordInCompletion($event);
  }

  constructor(
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.logger.write('category loaded: ', this.category, this.formData);
  }

  getQuestionData(question_key){
    return this.formData[question_key] || null;
  }


/*
  private recordInCompletion(update: ResponseUpdate){
    let id = update.question.id;
    this.completionMap[id] = true;

    let filled = 0, total = 0;
    for(let [key, val] of Object.entries(this.completionMap)){
      total++;
      if(val) filled++;
    }
    this.completion = filled / total;
    if(this.completion === 1){
      console.log('done!');
    }
  }
*/

}
