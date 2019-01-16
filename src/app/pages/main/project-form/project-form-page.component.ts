import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {AppForm} from '../../../core/forms/AppForm'
import {ProjectService} from '../../../core/projects/project.service'
import {AppProject} from '../../../core/projects/AppProject'
import {NotifyService} from '../../../core/notifications/notify.service'
import {FormService} from '../../../core/forms/form.service'
import {PubRepo} from "../../../core/pub-repos/PubRepo"
import {ProjectFormService} from "../../../core/projects/project-form.service"
import {PubReposService} from "../../../core/pub-repos/pub-repos.service"
import swal from 'sweetalert2'

@Component({
  selector: 'app-project-form-page',
  templateUrl: './project-form-page.component.html',
  styleUrls: ['./project-form-page.component.css']
})
export class ProjectFormPageComponent implements OnInit {

  /* Data */
  formId
  form: AppForm
  projectId
  project: AppProject
  modal
  projectForm = null
  repo: PubRepo = null

  /* UI */
  loading = 0

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public notify: NotifyService,
    private projectService: ProjectService,
    private formService: FormService,
    private projectFormService: ProjectFormService,
    private repoService: PubReposService
  ) {
  }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('pid')
    this.formId = +this.route.snapshot.paramMap.get('fid')
    this.loadProject()
    this.loadForm()
    this.loadProjectForm()
  }

  loadProject() {
    const projectID = this.projectId
    this.projectId = projectID
    this.loading++
    this.projectService.find(projectID)
      .finally(() => this.loading--)
      .subscribe(project => this.project = project)
  }

  loadForm() {
    const formID = this.formId
    this.loading++
    this.formService.getForm(formID)
      .finally(() => this.loading--)
      .subscribe(form => this.form = form)
  }

  loadProjectForm() {
    this.projectFormService.getProjectForm(this.projectId, this.formId)
      .subscribe(pf => {
        this.projectForm = pf
        if (pf.repo_uuid !== null) {
          this.loadRepo()
        }
      })
  }

  loadRepo() {
    this.repoService.retrieveRepo(this.projectId, this.projectForm.repo_uuid)
      .subscribe(repo => {
        this.repo = repo
      })
  }

  promptRemoveRepo() {
    this.notify.confirm(() => this.removeRepo(), {
      title: "Unlink Repository?",
      text: "This will remove the repository from this codebook,\ " +
        "as well as delete any assigned pending tasks. In progress and complete tasks won't be removed.",
      confirmButtonText: "Yes, unlink it."
    })
  }

  removeRepo() {
    this.projectFormService.removeRepository(this.projectId, this.formId)
      .subscribe(() => {
        this.loadProjectForm()
      }, err => {
        console.error(err)
        const res = err.error
        this.notify.toast(`${res.status}: ${res.msg}`)
      })
  }

  updateForm(form: AppForm) {
    this.projectService.updateForm(form)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Form updated.')
        this.loadForm()
      })
  }

  editForm(content) {
    this.modal = this.modalService.open(content)
  }

  exportForm(id: number) {
    this.formService.saveExport(id)
  }

  formFormSubmit(form: AppForm) {
    this.modal.close()
    this.updateForm(form)
  }
}

export function requestStart() {
  return {type: 'request_start'}
}

export function requestEnd() {
  return {type: 'request_end'}
}
