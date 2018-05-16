import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProjectFormService} from '../../projects/project-form.service'
import {NotifyService} from '../../notifications/notify.service'
import {AppEncodingTask} from "../AppEncodingTask"
import {Paginator} from '../../pagination/Paginator'
import {TaskService} from "../task.service"
import {Router} from "@angular/router"
import {Observable} from "rxjs/Observable"

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  @Input()
  get paginator(): Paginator<AppEncodingTask> {
    return this._paginator
  }

  set paginator(value: Paginator<AppEncodingTask>) {
    this.loading++
    this._paginator = value
    this._paginator.data$
      .do(() => this.loading -= 1)
      .subscribe(data => this.tasks = data)
  }
  private _paginator: Paginator<AppEncodingTask>

  @Input() statusName: string = null
  @Input() showFindTaskPromptIfEmpty = true

  @Output() clickFindTasks = new EventEmitter<void>()
  @Output() clickQuitTask = new EventEmitter<AppEncodingTask>()

  tasks: AppEncodingTask[] = []

  modal
  loading = 0

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService,
    private router: Router
  ) {
  }


  startEncoding(task: AppEncodingTask) {
    this.loading++
    this.taskService.startEncoding(task.id)
      .finally(() => this.loading--)
      .subscribe(response => this.navigateToPubCoder(task.id), error => {
        if (error.error.status === 'TASK_ALREADY_STARTED') {
          this.notify.alert("Task already started", "This task has already been started", 'error')
          return
        }
        this.notify.toast("General Failure")
      })
  }

  navigateToPubCoder(task_id: number) {
    this.router.navigate(['pub-coder', task_id])
  }

  onQuitTask(task: AppEncodingTask) {
    this.clickQuitTask.emit(task)
  }

  onFindTasks() {
    this.clickFindTasks.emit()
  }

  getStatus(task: AppEncodingTask) {
    if (task.status === null) {
      return 'NO_STATUS'
    }
    return task.status.split('_').map(this.toTitleCase).join(' ')
  }

  private toTitleCase(string: string) {
    if (string.length === 0) return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

}
