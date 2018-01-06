import {Component, Input, OnInit} from '@angular/core';
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EncodingService} from "../../shared/services/encoding.service";
import {LoggerService} from "../../shared/logger.service";
import {NotifyService} from "../../shared/services/notify.service";
import {ProjectFormService} from "../../shared/services/project-form.service";
import {AppProjectForm} from "../../models/AppProjectForm";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  encodings: AppExperimentEncoding[];

  loading = 0;

  constructor(
    private modalService: NgbModal,
    private encodingService: EncodingService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.loadEncodings();
  }

  loadEncodings(){
    this.loading++;
    this.encodingService.myEncodings()
      .finally(() => this.loading--)
      .subscribe( tasks => this.encodings = tasks);
  }

  onQuitEncoding(task: AppExperimentEncoding){
    let onComfirm = () => {
      this.loading++;
      this.encodingService.quitEncoding(task.id)
        .finally(() => this.loading--)
        .subscribe( () => {
          this.notify.toast('Assignment Deleted');
          this.loadEncodings();
        });
    };

    this.notify.confirm(onComfirm);
  }

  onTaskFormSubmit(projectForm: AppProjectForm){
    this.loading++;
    this.projectFormService.requestMyTasks(projectForm.project, projectForm.form)
      .finally(() => this.loading--)
      .subscribe( () => {
        this.closeModal();
        this.notify.toast('Tasks requested');
        this.loadEncodings();
      } );
  }

  modal;
  openModal(content){
    this.modal = this.modalService.open(content);
  }
  closeModal(){
    this.modal.close();
  }

}
