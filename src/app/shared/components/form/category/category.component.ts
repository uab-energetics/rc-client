import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../../../models/Category";
import {ResponseUpdate} from "../question/question.component";
import {Question} from "../../../../models/Question";

export interface CategoryUpdate {
  category: Category;
  question: Question;
  type: string;
  payload;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categoryModel: Category;
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
