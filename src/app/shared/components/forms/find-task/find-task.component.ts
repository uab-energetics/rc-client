import { Component, OnInit } from '@angular/core';
import {AppForm} from "../../../../models/AppForm";
import {AppPublication} from "../../../../models/AppPublication";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../services/form.service";
import {PublicationsService} from "../../../services/publications.service";
import {AppProjectForm} from "../../../../models/AppProjectForm";
import {ProjectFormService} from "../../../services/project-form.service";

@Component({
  selector: 'app-find-task',
  templateUrl: './find-task.component.html',
  styleUrls: ['./find-task.component.css']
})
export class FindTaskComponent implements OnInit {

  projectFormMap: {};

  taskForm: FormGroup;

  loading = 0;

  constructor(
    private fb: FormBuilder,
    private projectFormService: ProjectFormService
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      projectFormID: ['', Validators.required]
    });

    this.loading++;

    this.projectFormService.getProjectFormsEncoder()
      .finally(() => this.loading--)
      .subscribe( forms => {
        let map = {};
        for (let projectForm of forms) {
          map[projectForm.id] = projectForm;
        }
        this.projectFormMap = map;
      } );

  }

  getProjectForms(){
    return Object.values(this.projectFormMap);
  }

  exportForm(){
    return this.projectFormMap[this.taskForm.value.projectFormID];
  }

}
