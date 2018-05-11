import {Component, Input} from '@angular/core';
import {AppProject} from "../../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../../models/AppPublication";
import {ProjectService} from "../../../../shared/services/project.service";
import {PublicationsService} from "../../../../shared/services/publications.service";
import {NotifyService} from "../../../../core/notifications/notify.service";
import * as PapaParse from 'papaparse';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import {Paginator} from "../../../../core/pagination/Paginator";


@Component({
  selector: 'app-project-publications',
  templateUrl: './project-publications.component.html',
  styleUrls: ['./project-publications.component.css']
})
export class ProjectPublicationsComponent {

  @Input() project: AppProject;

  selectedFile: File;
  paginator: Paginator<AppPublication>;
  loading = 0;
  modal;

  constructor(
    private notify: NotifyService,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private publicationService: PublicationsService
  ) { }

  ngOnInit() {
    this.paginator = new Paginator((params) => this.projectService.getPublications(this.project.id, params));
    this.paginator.data$.subscribe( data => {
      this.publications = data;
      this.loading = 0;
    });
    this.paginator.events.on('request_start', () => this.loading = 1);
  }

  handleFileInput = (fileList: FileList) => this.selectedFile = fileList[0];
  openModal = (content) => this.modal = this.modalService.open(content);

  publications = [];

  onPublicationFormSubmit(newPublication: AppPublication){
    this.modal.close();
    this.projectService.createPublication(this.project.id, newPublication)
      .subscribe( pub => this.publications.push(pub));
  }

  onDeletePublication(publication){
    this.loading++;
    this.publicationService.deletePublication(publication.id)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Publication deleted');
        this.publications = this.publications.filter( pub => pub.id !== publication.id );
      })
  }

  onUploadFile(){
    if(!this.selectedFile)
      return alert('No file selected!');

    PapaParse.parse(this.selectedFile, {
      skipEmptyLines: true,
      complete: (results, file) => {
        console.log("Parsing complete:", results, file);
        if(results.errors.length > 0)
          return alert('Could not parse file. Please check format and try again. (Details in console)');

        this.loading++;
        this.publicationService.uploadFromCSV(this.project.id, results.data)
          .finally(() => this.loading--)
          .subscribe( res => {
            this.notify.toast('CSV Uploaded');
          }, err => {
            this.notify.alert('Error', err.error.details, 'error');
            return []
          });
      }
    });
  }
}
