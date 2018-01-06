import {Component, Input} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../../shared/services/project.service";
import {PublicationsService} from "../../../shared/services/publications.service";
import {NotifyService} from "../../../shared/services/notify.service";
import {loadingPipe} from '../../../shared/helpers';
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
    this.projectFormService.addPublications(this.project, this.form, publications, priority)
      .finally(() => this.loading--)
      .subscribe(() => this.loadPublications())
  }

  onDeletePublication(publication){
    this.projectFormService.removePublication(this.project, this.form, publication)
      .pipe(loadingPipe.bind(this))
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


}
