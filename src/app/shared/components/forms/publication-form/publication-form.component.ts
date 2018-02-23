import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppPublication} from "../../../../models/AppPublication";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent {

  @Output() appSubmit = new EventEmitter<AppPublication>();

  publicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.publicationForm = fb.group({
      name: [ '', Validators.required ],
      source_id: [ '', Validators.maxLength(190)],
      embedding_url: [ '', Validators.required ]
    })
  }

  submit(){
    this.appSubmit.emit(this.exportForm());
  }

  public exportForm(): AppPublication {
    return Object.assign({}, this.publicationForm.value);
  }

}
