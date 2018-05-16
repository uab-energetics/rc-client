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
export class TaskListComponent implements OnInit {

  @Input() taskFunc: (params: {page: number, page_size: number}) => Observable<AppEncodingTask[]>
  @Input() statusName: string = null
  @Input() showFindTaskPromptIfEmpty = true
  @Output() clickFindTasks = new EventEmitter<void>()

  tasks: AppEncodingTask[] = []
  paginator: Paginator<AppEncodingTask>

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

  ngOnInit() {
    this.loadTasks()
  }

  loadTasks() {
    this.loading++
    this.paginator = new Paginator<AppEncodingTask>(params => this.taskFunc(params))
    this.paginator.data$
      .do(() => this.loading -= 1)
      .subscribe(data => this.tasks = data)
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
    this.notify.confirm(() => {
      this.loading++
      this.taskService.quitTask(task.id)
        .finally(() => this.loading--)
        .subscribe(() => {
          this.notify.toast('Task Deleted')
          this.ngOnInit()
        })
    })
  }

  findTasks() {
    this.clickFindTasks.emit()
  }

  getTaskTypeText() {
    if (this.statusName === null) return ""
    return ` with status ${this.statusName}`
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
