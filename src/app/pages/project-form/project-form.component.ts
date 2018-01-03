import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppForm} from "../../models/AppForm";
import {ProjectService} from "../../shared/services/project.service";
import {MatSnackBar} from "@angular/material";
import {AppProject} from "../../models/AppProject";
import {AppPublication} from "../../models/AppPublication";
import {LoggerService} from "../../shared/logger.service";
import {NotifyService} from "../../shared/services/notify.service";
import {FormService} from "../../../../../../../Desktop/Link to Projects/research-coder/src/app/shared/services/form.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  /* Data */
  form: AppForm;
  project: AppProject;

  /* UI */
  loading = 0;

  constructor(
    private route: ActivatedRoute,
    public notify: NotifyService,
    private projectService: ProjectService,
    private formService: FormService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.loadProject();
    this.loadForm();
  }

  loadProject() {
    let projectID = +this.route.snapshot.paramMap.get('pid');
    this.loading++;
    this.projectService.find(projectID)
      .finally(() => this.loading--)
      .subscribe(project => this.project = project)
  }

  loadForm() {
    let formID = +this.route.snapshot.paramMap.get('fid');
    this.loading++;
    this.formService.getForm(formID)
      .finally(() => this.loading--)
      .subscribe(form => this.form = form);
  }
}

export function requestStart(){
  return { type: 'request_start' }
}

export function requestEnd(){
  return { type: 'request_end' }
}
