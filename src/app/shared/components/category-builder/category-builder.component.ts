import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, makeCategory} from "../../../models/Category";

@Component({
  selector: 'app-category-builder',
  templateUrl: './category-builder.component.html',
  styleUrls: ['./category-builder.component.css']
})
export class CategoryBuilderComponent {

  @Output() appSave = new EventEmitter<Category>();
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = fb.group({
      name: ['', Validators.required],
      description: ['']
    })
  }

  exportModel(): Category {
    let formModel = this.categoryForm.value;

    return makeCategory({
      name: formModel.name,
      description: formModel.description
    })
  }

  save() {
    this.appSave.emit(this.exportModel());
  }

}
