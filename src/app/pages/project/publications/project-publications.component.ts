import {Component, Input} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../../shared/services/project.service";
import {PublicationsService} from "../../../shared/services/publications.service";
import {NotifyService} from "../../../shared/services/notify.service";
import {loadingPipe} from '../../../shared/helpers';
import * as PapaParse from 'papaparse';

@Component({
  selector: 'app-project-publications',
  templateUrl: './project-publications.component.html',
  styleUrls: ['./project-publications.component.css']
})
export class ProjectPublicationsComponent {

  @Input() project: AppProject;

  loading = 0;

  publications: AppPublication[];

  /* UI Data */
  modal;

  constructor(
    private notify: NotifyService,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private publicationService: PublicationsService
  ) { }

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications(){
    this.projectService.getPublications(this.project.id)
      .pipe<AppPublication[]>(loadingPipe.bind(this))
      .subscribe( pubs => this.publications = pubs );
  }

  onPublicationFormSubmit(newPublication: AppPublication){
    this.modal.close();
    this.projectService.createPublication(this.project.id, newPublication)
      .pipe(loadingPipe.bind(this))
      .subscribe(() => this.loadPublications())
  }

  onDeletePublication(publication){
    this.publicationService.deletePublication(publication.id)
      .pipe(loadingPipe.bind(this))
      .subscribe(() => {
        this.notify.toast('Publication deleted');
        this.loadPublications();
      })
  }


  selectedFile: File;
  handleFileInput(fileList: FileList){
    this.selectedFile = fileList[0];
  }

  uploadFile(){
    if(!this.selectedFile)
      return alert('No file selected!');

    PapaParse.parse(this.selectedFile, {
      complete: (results, file) => {
        console.log("Parsing complete:", results, file);
        if(results.errors.length > 0)
          return alert('Could not parse file. Please check format and try again. (Details in console)');

        this.publicationService.uploadFromCSV(this.project.id, results.data)
          .finally(() => this.loading--)
          .subscribe( res => {
            this.notify.toast('CSV Uploaded');
            this.loadPublications();
          }, err => {
            this.notify.alert('Error', err.error.details, 'error');
            return []
          });
      }
    });
  }

  openModal(content){
    this.modal = this.modalService.open(content);
  }

}
