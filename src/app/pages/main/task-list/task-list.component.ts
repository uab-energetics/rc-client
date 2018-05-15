import {Component, OnInit} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProjectFormService} from '../../../core/projects/project-form.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {AppProjectForm} from '../../../core/forms/AppProjectForm'
import {AppEncodingTask} from "../../../core/tasks/AppEncodingTask";
import {Paginator} from '../../../core/pagination/Paginator'
import {AppPublication} from '../../../core/publications/AppPublication'
import {TaskService} from "../../../core/tasks/task.service";
import {Router} from "@angular/router";
import {SweetAlertService} from "ng2-sweetalert2";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: AppEncodingTask[] = [];
  paginator: Paginator<AppEncodingTask>

  modal;
  loading = 0;

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(){
    this.loading++;
    this.paginator = new Paginator<AppEncodingTask>( params => this.taskService.myTasks(params) )
    this.paginator.data$
      .do(() => this.loading -= 1)
      .subscribe( data => this.tasks = data )
  }

  startEncoding(task: AppEncodingTask) {
    this.loading++;
    this.taskService.startEncoding(task.id)
      .finally(() => this.loading--)
      .subscribe(response => this.navigateToPubCoder(task.id), error => {
        if (error.error.status === 'TASK_ALREADY_STARTED') {
          this.notify.alert("Task already started", "This task has already been started", 'error')
          return;
        }
        this.notify.toast("General Failure")
      })
  }

  navigateToPubCoder(task_id: number) {
    this.router.navigate(['pub-coder', task_id])
  }

  onQuitTask(task: AppEncodingTask){
    this.notify.confirm(() => {
      this.loading++;
      this.taskService.quitTask(task.id)
        .finally(() => this.loading--)
        .subscribe( () => {
          this.notify.toast('Task Deleted');
          this.ngOnInit();
        });
    });
  }

  onTaskFormSubmit(projectForm: AppProjectForm){
    this.loading++;
    this.projectFormService.requestMyTasks(projectForm.project, projectForm.form)
      .finally(() => this.loading--)
      .subscribe( () => {
        this.closeModal();
        this.notify.toast('Tasks requested');
        this.loadTasks();
      });
  }

  openModal(content){
    this.modal = this.modalService.open(content);
  }

  closeModal(){
    this.modal.close();
  }

  getStatus(task: AppEncodingTask) {
    if (task.status === null) {
      return 'NO_STATUS';
    }
    return task.status.split('_').map(this.toTitleCase).join(' ')
  }

  private toTitleCase(string: string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

}
