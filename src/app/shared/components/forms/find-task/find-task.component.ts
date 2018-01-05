import { Component, OnInit } from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppPublication} from "../../../../models/AppPublication";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../services/form.service";
import {PublicationsService} from "../../../services/publications.service";

@Component({
  selector: 'app-find-task',
  templateUrl: './find-task.component.html',
  styleUrls: ['./find-task.component.css']
})
export class FindTaskComponent implements OnInit {

  forms: AppForm[] = [];
  publications: AppPublication[] = [];

  taskForm: FormGroup;

  loading = 0;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private pubService: PublicationsService
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      formID: ['', Validators.required],
      publicationID: ['', Validators.required],
    });

    this.loading += 2;
    this.formService.searchForms()
      .finally(() => this.loading--)
      .subscribe( forms => this.forms = forms );
    this.pubService.searchPublications()
      .finally(() => this.loading--)
      .subscribe(pubs => this.publications = pubs.data);
  }

  exportForm(){
    return this.taskForm.value;
  }

}
