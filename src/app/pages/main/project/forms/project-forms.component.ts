import {Component, Input} from '@angular/core'
import {AppForm} from '../../../../models/AppForm'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProjectService} from '../../../../shared/services/project.service'
import {AppProject} from '../../../../models/AppProject'
import 'rxjs/add/operator/finally'
import {NotifyService} from '../../../../shared/services/notify.service'
import {FormService} from '../../../../shared/services/form.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-project-forms',
  templateUrl: './project-forms.component.html',
  styleUrls: ['./project-forms.component.css']
})
export class ProjectFormsComponent {

  @Input() project: AppProject;
  forms: AppForm[];

  editingForm: AppForm;

  modal;
  loading = 0;

  constructor(
    private modalService: NgbModal,
    private router: Router,
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

  updateForm(form: AppForm){
    console.log('updating...', form);
    this.loading++;
    this.projectService.updateForm(form)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Form updated.');
        this.loadForms();
      })
  }

  formFormSubmit(form: AppForm){
    this.modal.close();
    console.log(form);
    if(form.id){
      this.updateForm(form);
    } else {
      this.createForm(form);
    }
  }

  exportForm(id: number) {
    this.formService.saveExport(id);
  }

  manageForm(form: AppForm) {
    this.router.navigate(['/projects/'+this.project.id+"/forms/"+form.id]);
  }


  /**
   * ======================
   * UI HANDLERS
   * ======================
   */


  openModal(content) {
    this.modal = this.modalService.open(content)
  }


  editForm(form: AppForm, content){
    this.editingForm = form;
    this.modal = this.modalService.open(content)
  }

}
