import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-form',
  templateUrl: './form-form.component.html',
  styleUrls: ['./form-form.component.css']
})
export class FormFormComponent {

  @Output() appSubmit = new EventEmitter<Form>();

  formForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formForm = fb.group({
      name: [ '', Validators.required ],
      description: ''
    })
  }

  submit(){
    this.appSubmit.emit(this.exportForm());
  }

  public exportForm(){
    return Object.assign({}, this.formForm.value, {
      published: false,
      type: 'experiment' // TODO - move types to constants
    });
  }

}
