import {Component, OnInit} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {EncodingService} from '../../../core/encodings/encoding.service'
import {ProjectFormService} from '../../../core/projects/project-form.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {AppProjectForm} from '../../../core/forms/AppProjectForm'
import {AppEncodingTask} from "../../../models/AppEncodingTask";
import {Paginator} from '../../../core/pagination/Paginator'
import {AppPublication} from '../../../core/publications/AppPublication'

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
    private encodingService: EncodingService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(){
    this.loading++;
    this.paginator = new Paginator<AppEncodingTask>( params => this.encodingService.myTasks(params) )
    this.paginator.data$
      .do(() => this.loading -= 1)
      .subscribe( data => this.tasks = data )
  }

  onQuitTask(task: AppEncodingTask){
    this.notify.confirm(() => {
      this.loading++;
      this.encodingService.quitTask(task.id)
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

}
