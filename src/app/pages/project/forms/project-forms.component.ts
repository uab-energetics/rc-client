import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../models/AppForm";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectService} from "../../../shared/services/project.service";
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import 'rxjs/add/operator/finally';
import {NotifyService} from "../../../shared/services/notify.service";

@Component({
  selector: 'app-project-forms',
  templateUrl: './project-forms.component.html',
  styleUrls: ['./project-forms.component.css']
})
export class ProjectFormsComponent {

  @Input() project: AppProject;
  forms: AppForm[];

  modal: NgbActiveModal;
  showLoader = false;

  constructor(
    private modalService: NgbModal,
    private notify: NotifyService,
    private projectService: ProjectService
  ) { }

  ngOnInit(){
    this.loadForms();
  }

  loadForms() {
    this.showLoader = true;
    this.projectService.getForms(this.project.id)
      .finally(() => this.showLoader = false )
      .subscribe( forms => this.forms = forms );
  }

  createForm(newForm: AppForm){
    this.showLoader = true;
    this.modal.close();
    this.projectService.createForm(this.project.id, newForm)
      .then( () => {
        this.loadForms();
        this.notify.toast('Created Form!');
      });
  }

  deleteForm(id: number) {
    let confirmDelete = () => {
      this.showLoader = true;
      this.projectService.deleteForm(id)
        .subscribe( res => {
          this.loadForms();
          this.notify.toast('Form deleted.');
        } )
    };

    this.notify.confirm(confirmDelete);
  }

  openModal(content) {
    this.modal = this.modalService.open(content)
  }

}
