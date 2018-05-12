import {Component} from '@angular/core'
import {AppForm} from '../../../core/forms/AppForm'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProjectService} from '../../../core/projects/project.service'
import {AppProject} from '../../../core/projects/AppProject'
import 'rxjs/add/operator/finally'
import {NotifyService} from '../../../core/notifications/notify.service'
import {FormService} from '../../../core/forms/form.service'
import {Router} from '@angular/router'
import {ActiveProjectService} from '../../../core/active-project/active-project.service'

@Component({
  selector: 'app-project-forms',
  templateUrl: './project-forms.component.html',
  styleUrls: ['./project-forms.component.css']
})
export class ProjectFormsComponent {

  project: AppProject;
  forms: AppForm[] = [];

  editingForm: AppForm;

  modal;
  loading = 0;

  constructor(
    private modalService: NgbModal,
    private activeProjectService: ActiveProjectService,
    private router: Router,
    private notify: NotifyService,
    private projectService: ProjectService,
    private formService: FormService
  ) { }

  ngOnInit(){
    this.activeProjectService.project$
      .subscribe( project => {
        this.project = project
        this.loadForms()
      })
  }

  loadForms() {
    if(!this.project) return
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
    this.notify.confirm(() => {
      this.loading++;
      this.projectService.deleteForm(id)
        .finally(() => this.loading--)
        .subscribe( res => {
          this.loadForms();
          this.notify.toast('Form deleted.');
        })
    })
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
