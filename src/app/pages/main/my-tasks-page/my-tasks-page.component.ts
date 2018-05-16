import {Component, OnInit} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProjectFormService} from '../../../core/projects/project-form.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {AppProjectForm} from '../../../core/forms/AppProjectForm'
import {TaskService} from "../../../core/tasks/task.service"

@Component({
  selector: 'app-my-tasks-page',
  templateUrl: './my-tasks-page.component.html',
  styleUrls: ['./my-tasks-page.component.css']
})
export class MyTasksPageComponent implements OnInit {

  modal
  loading = 0

  pendingFunc = (params) => {
    return this.taskService.myTasks(params, 'pending')
  }

  inProgressFunc = (params) => {
    return this.taskService.myTasks(params, 'in_progress')
  }

  completeFunc = (params) => {
    return this.taskService.myTasks(params, 'complete')
  }

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService
  ) {
  }

  ngOnInit() {
    this.loadTasks()
  }

  loadTasks() {
    // TODO
  }


  onTaskFormSubmit(projectForm: AppProjectForm) {
    this.loading++
    this.projectFormService.requestMyTasks(projectForm.project, projectForm.form)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.closeModal()
        this.notify.toast('Tasks requested')
        this.loadTasks()
      })
  }

  openModal(content) {
    this.modal = this.modalService.open(content)
  }

  closeModal() {
    this.modal.close()
  }

}
