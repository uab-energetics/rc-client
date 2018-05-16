import {Component, OnInit} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProjectFormService} from '../../../core/projects/project-form.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {AppProjectForm} from '../../../core/forms/AppProjectForm'
import {TaskService} from "../../../core/tasks/task.service"
import {Paginator} from "../../../core/pagination/Paginator"
import {AppEncodingTask} from "../../../core/tasks/AppEncodingTask"

@Component({
  selector: 'app-my-tasks-page',
  templateUrl: './my-tasks-page.component.html',
  styleUrls: ['./my-tasks-page.component.css']
})
export class MyTasksPageComponent implements OnInit {

  modal

  pendingPaginator: Paginator<AppEncodingTask>
  inProgressPaginator: Paginator<AppEncodingTask>
  completePaginator: Paginator<AppEncodingTask>


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
    this.pendingPaginator = new Paginator<AppEncodingTask>(params => this.taskService.myTasks(params, 'pending'))
    this.inProgressPaginator = new Paginator<AppEncodingTask>(params => this.taskService.myTasks(params, 'in_progress'))
    this.completePaginator = new Paginator<AppEncodingTask>(params => this.taskService.myTasks(params, 'complete'))
  }

  quitTask(task: AppEncodingTask) {
    this.notify.confirm(() => {
      this.taskService.quitTask(task.id)
        .subscribe(() => {
          this.notify.toast('Task Deleted')
          this.loadTasks()
        })
    })
  }


  onTaskFormSubmit(projectForm: AppProjectForm) {
    this.projectFormService.requestMyTasks(projectForm.project, projectForm.form)
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
