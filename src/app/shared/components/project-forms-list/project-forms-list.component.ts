import {Component, Input, OnInit} from '@angular/core';
import {AppForm} from "../../../models/AppForm";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectService} from "../../services/project.service";
import {MatSnackBar} from "@angular/material";
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";

@Component({
  selector: 'app-project-forms-list',
  templateUrl: './project-forms-list.component.html',
  styleUrls: ['./project-forms-list.component.css']
})
export class ProjectFormsListComponent {

  _project: AppProject;
  @Input()
  set project( project: AppProject){
    this._project = project;
    this.loadProjectForms();
  }
  get project() { return this._project }

  forms: AppForm[];

  formFormModal: NgbActiveModal;
  showLoader = false;

  constructor(
    private modalService: NgbModal,
    public snackBar: MatSnackBar,
    private alerts: SweetAlertService,
    private projectService: ProjectService
  ) { }

  loadProjectForms() {
    if(!this.project) return;
    this.showLoader = true;
    this.projectService.getForms(this.project.id)
      .subscribe( forms => {
        this.forms = forms;
        this.showLoader = false;
      } );
  }

  onFormFormSubmit(newForm: AppForm){
    this.showLoader = true;
    this.formFormModal.close();
    this.projectService.createForm(this.project.id, newForm)
      .then( () => {
        this.loadProjectForms();
        this.snackBar.open('Form Created!', 'Ok', { verticalPosition: 'top' })
      });
  }

  deleteForm(id: number) {
    let confirmDelete = () => {
      this.showLoader = true;
      this.projectService.deleteForm(id)
        .subscribe( res => {
          this.loadProjectForms();
          this.snackBar.open('Form deleted.', 'Ok', { verticalPosition: 'top', duration: 2000 });
        } )
    };

    this.alerts.swal({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result);
      if (result) {
        confirmDelete();
      }
    });
  }

  openFormForm(content) {
    this.formFormModal = this.modalService.open(content)
  }

}
