import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../../models/Category";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categoryModel: Category;
  @Input() observer: Subject<any>;

  constructor() { }

  ngOnInit() {
  }

}
