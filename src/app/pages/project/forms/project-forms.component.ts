import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppForm} from "../../../models/AppForm";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectService} from "../../../shared/services/project.service";
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import 'rxjs/add/operator/finally';
import {NotifyService} from "../../../shared/services/notify.service";
import {FormService} from "../../../shared/services/form/form.service";

@Component({
  selector: 'app-project-forms',
  templateUrl: './project-forms.component.html',
  styleUrls: ['./project-forms.component.css']
})
export class ProjectFormsComponent {

  @Input() project: AppProject;
  forms: AppForm[];

  modal: NgbActiveModal;
  loading = 0;

  constructor(
    private modalService: NgbModal,
    private notify: NotifyService,
    private projectService: ProjectService,
    private formService: FormService
  ) { }

  ngOnInit(){
    this.loadForms();
  }

  loadForms() {
    this.loading++;
    this.projectService.getForms(this.project.id)
      .finally(() => this.loading-- )
      .subscribe( forms => this.forms = forms );
  }

  createForm(newForm: AppForm){
    this.loading++;
    this.modal.close();
    this.projectService.createForm(this.project.id, newForm)
      .finally(() => this.loading-- )
      .subscribe( () => {
        this.loadForms();
        this.notify.toast('Created Form!');
      });
  }

  deleteForm(id: number) {
    let confirmDelete = () => {
      this.loading++;
      this.projectService.deleteForm(id)
        .finally(() => this.loading--)
        .subscribe( res => {
          this.loadForms();
          this.notify.toast('Form deleted.');
        } )
    };

    this.notify.confirm(confirmDelete);
  }

  exportForm(id: number) {
    this.formService.saveExport(id);
  }

  openModal(content) {
    this.modal = this.modalService.open(content)
  }

}
