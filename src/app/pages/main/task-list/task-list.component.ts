import {Component, OnInit} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {EncodingService} from '../../../core/encodings/encoding.service'
import {ProjectFormService} from '../../../core/projects/project-form.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {AppProjectForm} from '../../../core/forms/AppProjectForm'
import {AppEncodingTask} from "../../../models/AppEncodingTask";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: AppEncodingTask[] = [];

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
    this.encodingService.myTasks()
      .finally(() => this.loading--)
      .subscribe( tasks => {
        this.tasks = tasks;
        console.log(tasks)
      });
  }

  onQuitTask(task: AppEncodingTask){
    let onConfirm = () => {
      this.loading++;
      this.encodingService.quitTask(task.id)
        .finally(() => this.loading--)
        .subscribe( () => {
          this.notify.toast('Task Deleted');
          this.ngOnInit();
        });
    };

    this.notify.confirm(onConfirm);
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

  modal;
  openModal(content){
    this.modal = this.modalService.open(content);
  }
  closeModal(){
    this.modal.close();
  }

}
