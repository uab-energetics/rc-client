import {Component, Input, OnInit} from '@angular/core';
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EncodingService} from "../../shared/services/encoding.service";
import {LoggerService} from "../../shared/logger.service";
import {NotifyService} from "../../shared/services/notify.service";
import {ProjectFormService} from "../../shared/services/project-form.service";
import {AppProjectForm} from "../../models/AppProjectForm";
import {AppEncodingTask} from "../../models/AppEncodingTask";

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
      .subscribe( tasks => this.tasks = tasks);
  }

  onQuitEncoding(task: AppExperimentEncoding){
    let onConfirm = () => {
      this.loading++;
      this.encodingService.quitEncoding(task.id)
        .finally(() => this.loading--)
        .subscribe( () => {
          this.notify.toast('Assignment Deleted');
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
