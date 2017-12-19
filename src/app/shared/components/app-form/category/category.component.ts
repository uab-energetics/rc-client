import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppCategory} from "../../../../models/AppCategory";
import {ResponseUpdate} from "../question/question.component";
import {AppQuestion} from "../../../../models/AppQuestion";

export interface CategoryUpdate {
  category: AppCategory;
  question: AppQuestion;
  response: Response;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categoryModel: AppCategory;
  @Output() appCategoryUpdate = new EventEmitter<CategoryUpdate>();

  completion: number;
  completionMap = {};

  onQuestionChange($event: ResponseUpdate){
    this.appCategoryUpdate.emit( Object.assign($event, { category: this.categoryModel }));
    this.recordInCompletion($event);
  }

  constructor() { }

  ngOnInit() {
    this.categoryModel.questions.forEach( question => {
      let id = question.id;
      this.completionMap[id] = false;
    })
  }

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

}
