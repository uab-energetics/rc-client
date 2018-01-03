import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppCategory} from "../../../models/AppCategory";


const defaultModel = {
  name: '',
  description: ''
};



@Component({
  selector: 'app-category-builder',
  templateUrl: './category-builder.component.html',
  styleUrls: ['./category-builder.component.css']
})
export class CategoryBuilderComponent implements OnInit {

  @Input() category: AppCategory;

  @Output() appSave = new EventEmitter<AppCategory>();
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.setupModel();
  }

  setupModel(): void {
    let initialState: any = this.category;
    if(!initialState) initialState = defaultModel;

    this.categoryForm = this.fb.group({
      name: [initialState.name, Validators.required],
      description: [initialState.description]
    })
  }

  exportModel(): AppCategory {
    return Object.assign({}, this.category, this.categoryForm.value);
  }

  save() {
    this.appSave.emit(this.exportModel());
  }

}
