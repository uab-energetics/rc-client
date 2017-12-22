import {Component, Input, OnInit} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NotifyService} from "../../services/notify.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../services/project.service";
import {requestEnd, requestStart} from "../../../pages/project/project.component";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-project-publications-list',
  templateUrl: './project-publications-list.component.html',
  styleUrls: ['./project-publications-list.component.css']
})
export class ProjectPublicationsListComponent implements OnInit {

  @Input() project: AppProject;
  @Input() dispatcher: Function = () => {};

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
    this.dispatcher(requestStart());
    this.projectService.getPublications(this.project.id)
      .then( pubs => {
        this.dispatcher(requestEnd());
        this.publications = pubs;
      } );
  }

  onPublicationFormSubmit(newPublication: AppPublication){
    this.dispatcher(requestStart());
    this.modal.close();
    this.projectService.createPublication(this.project.id, newPublication)
      .then( () => this.loadPublications() )
      .catch( err => console.log(err) )
      .then( () => this.dispatcher(requestEnd()) );
  }

  openModal(content){
    this.modal = this.modalService.open(content);
  }

}
