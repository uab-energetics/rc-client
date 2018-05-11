import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {AppForm} from '../../../models/AppForm'
import {ProjectService} from '../../../shared/services/project.service'
import {AppProject} from '../../../models/AppProject'
import {LoggerService} from '../../../shared/logger.service'
import {NotifyService} from '../../../shared/services/notify.service'
import {FormService} from '../../../shared/services/form.service'

@Component({
  selector: 'app-project-form-page',
  templateUrl: './project-form-page.component.html',
  styleUrls: ['./project-form-page.component.css']
})
export class ProjectFormPageComponent implements OnInit {

  /* Data */
  form: AppForm;
  project: AppProject;
  modal;

  /* UI */
  loading = 0;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public notify: NotifyService,
    private projectService: ProjectService,
    private formService: FormService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.loadProject();
    this.loadForm();
  }

  loadProject() {
    let projectID = +this.route.snapshot.paramMap.get('pid');
    this.loading++;
    this.projectService.find(projectID)
      .finally(() => this.loading--)
      .subscribe(project => this.project = project)
  }

  loadForm() {
    let formID = +this.route.snapshot.paramMap.get('fid');
    this.loading++;
    this.formService.getForm(formID)
      .finally(() => this.loading--)
      .subscribe(form => this.form = form);
  }

  updateForm(form: AppForm) {
    this.projectService.updateForm(form)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Form updated.');
        this.loadForm();
      })
  }

  editForm(content){
    this.modal = this.modalService.open(content)
  }

  exportForm(id: number) {
    this.formService.saveExport(id);
  }

  formFormSubmit(form: AppForm){
    this.modal.close();
    this.updateForm(form);
  }
}

export function requestStart(){
  return { type: 'request_start' }
}

export function requestEnd(){
  return { type: 'request_end' }
}
