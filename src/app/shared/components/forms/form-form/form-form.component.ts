import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppForm} from "../../../../models/AppForm";

@Component({
  selector: 'app-form-form',
  templateUrl: './form-form.component.html',
  styleUrls: ['./form-form.component.css']
})
export class FormFormComponent {

  @Output() appSubmit = new EventEmitter<AppForm>();

  formForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formForm = fb.group({
      name: [ '', Validators.required ],
      description: [ '', Validators.required ]
    })
  }

  submit(){
    this.appSubmit.emit(this.exportForm());
  }

  public exportForm(): AppForm {
    return Object.assign({}, this.formForm.value, {
      published: false,
      type: 'experiment' // TODO - move types to constants
    });
  }

}
