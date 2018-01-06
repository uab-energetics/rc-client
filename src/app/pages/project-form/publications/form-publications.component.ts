import {Component, Input} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../../shared/services/project.service";
import {PublicationsService} from "../../../shared/services/publications.service";
import {NotifyService} from "../../../shared/services/notify.service";
import * as PapaParse from 'papaparse';
import {ProjectFormService} from "../../../shared/services/project-form.service";
import {AppForm} from "../../../models/AppForm";
import {AppFormPublication} from "../../../models/AppFormPublication";

@Component({
  selector: 'app-form-publications',
  templateUrl: './form-publications.component.html',
  styleUrls: ['./form-publications.component.css']
})
export class FormPublicationsComponent {

  @Input() project: AppProject;
  @Input() form: AppForm;

  loading = 0;

  publications: AppFormPublication[];

  selectedFile: File;

  /* UI Data */
  modal;

  constructor(
    private notify: NotifyService,
    private modalService: NgbModal,
    private projectFormService: ProjectFormService,
    private projectService: ProjectService,
    private publicationService: PublicationsService
  ) { }

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications(){
    this.loading++;
    this.projectFormService.getPublications(this.project, this.form)
      .finally(() => this.loading--)
      .subscribe( pubs => this.publications = pubs );
  }

  onPublicationFormSubmit(publications: AppPublication[], priority: number){
    this.modal.close();
    this.loading++;
    let pubIDs = this.publications.map(pub => pub.id);
    this.projectFormService.addPublications(this.project, this.form, pubIDs, priority)
      .finally(() => this.loading--)
      .subscribe(() => this.loadPublications())
  }

  onDeletePublication(publication){
    this.projectFormService.removePublication(this.project, this.form, publication)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Publication removed');
        this.loadPublications();
      })
  }

  changePriority(publication: AppPublication, priority: number) {
    this.projectFormService.addPublication(this.project, this.form, publication, null);
    this.loadPublications();
  }

  addProjectPublications() {
    this.projectFormService.inheritProjectPublications(this.project, this.form)
      .subscribe(() => this.loadPublications());
  }

  handleFileInput = (fileList: FileList) => this.selectedFile = fileList[0];

  onUploadFile(){
    if(!this.selectedFile)
      return alert('No file selected!');

    PapaParse.parse(this.selectedFile, {
      skipEmptyLines: true,
      delimiter: ",", //specified because papaparse will throw errors for one-column csvs otherwise
      complete: (results, file) => {
        console.log("Parsing complete:", results, file);
        if(results.errors.length > 0)
          return alert('Could not parse file. Please check format and try again. (Details in console)');
        let pubIds = results.data.map(row => row[0]);
        this.loading++;
        this.projectFormService.addPublications(this.project, this.form, pubIds)
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


}
