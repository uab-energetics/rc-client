import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Form} from "../../models/Form";
import {ProjectService} from "../../shared/services/project.service";
import {MatSnackBar} from "@angular/material";
import {AppProject} from "../../models/Project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /* Data */
  projectForms: Form[] = [];
  project: AppProject;
  /* UI */
  formFormModal: NgbActiveModal;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public snackBar: MatSnackBar,
    private projectService: ProjectService
  ) { }

  onFormFormSubmit(newForm: Form){
    this.showLoader = true;
    this.projectService.createForm(this.project.id, newForm)
      .then( _newForm  => {
        this.projectForms.push(_newForm);
        this.snackBar.open('Form Created!', 'Ok', { verticalPosition: 'top' })
      })
      .catch( err => console.error(err) )
      .then(()=> {
        this.formFormModal.close();
        this.showLoader = false;
      });
  }

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    let projectID = +this.route.snapshot.paramMap.get('id');
    this.projectService.firstOrFail(projectID)
      .subscribe(project => {
        this.project = project;
        this.projectService.getForms(this.project.id)
          .subscribe( forms => this.projectForms = forms );
      })
  }

  openFormForm(content) {
    this.formFormModal = this.modalService.open(content)
  }

}
