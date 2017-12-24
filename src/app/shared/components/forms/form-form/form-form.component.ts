import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppForm} from "../../../../models/AppForm";

@Component({
  selector: 'app-form-form',
  templateUrl: './form-form.component.html',
  styleUrls: ['./form-form.component.css']
})
export class FormFormComponent implements OnInit {

  @Output() appSubmit = new EventEmitter<AppForm>();
  @Input() appForm: AppForm;

  formForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    let name = "";
    let description = "";
    if(this.appForm){
      name = this.appForm.name;
      description = this.appForm.description;
    }

    this.formForm = this.fb.group({
      name: [ name, Validators.required ],
      description: [ description, Validators.required ]
    })
  }

  submit(){
    this.appSubmit.emit(this.exportForm());
  }

  public exportForm(): AppForm {
    return Object.assign({ published: false, type: 'experiment' }, this.appForm, this.formForm.value);
  }

}
