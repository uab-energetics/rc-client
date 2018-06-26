import {Component, Input, OnInit} from '@angular/core';
import {AppCategory} from "../../../form-categories/AppCategory";

@Component({
  selector: 'app-render-category',
  templateUrl: './render-category.component.html',
  styleUrls: ['./render-category.component.scss']
})
export class RenderCategoryComponent implements OnInit {

  @Input() category: AppCategory

  ngOnInit() {
  }

}
