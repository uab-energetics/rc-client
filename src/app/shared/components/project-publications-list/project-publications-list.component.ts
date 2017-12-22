import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NotifyService} from "../../services/notify.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../services/project.service";
import {requestEnd, requestStart} from "../../../pages/project/project.component";
import {MatTableDataSource} from "@angular/material";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-project-publications-list',
  templateUrl: './project-publications-list.component.html',
  styleUrls: ['./project-publications-list.component.css']
})
export class ProjectPublicationsListComponent {

  @Input() project: AppProject;

  showLoader = false;

  publications: AppPublication[] = [];

  /* UI Data */
  modal;

  constructor(
    private notify: NotifyService,
    private modalService: NgbModal,
    private projectService: ProjectService
  ) {}

  ngOnInit(){
    this.loadPublications();
  }

  loadPublications(){
    this.showLoader = true;
    this.projectService.getForms(this.project.id)
      .pipe(catchError((err) => [] ))
      .subscribe( publications => {
        this.publications = publications;
      },()=>{}, () => {
        this.showLoader = false;
      } );
  }

  onPublicationFormSubmit(newPublication: AppPublication){
    this.showLoader = true;
    this.modal.close();
    this.projectService.createPublication(this.project.id, newPublication)
      .then( () => this.loadPublications() )
      .catch( err => console.log(err) )
      .then( () => this.showLoader = false );
  }

  openModal(content){
    this.modal = this.modalService.open(content);
  }

}
