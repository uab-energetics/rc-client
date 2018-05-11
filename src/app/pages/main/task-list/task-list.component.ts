import {Component, Input, OnInit} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {EncodingService} from '../../../core/encodings/encoding.service'
import {ProjectFormService} from '../../../core/projects/project-form.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {AppProjectForm} from '../../../core/forms/AppProjectForm'
import {AppExperimentEncoding} from '../../../core/encodings/AppExperimentEncoding'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  encodings: AppExperimentEncoding[]

  modal = null
  loading = 0

  constructor(
    private modalService: NgbModal,
    private encodingService: EncodingService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.loadEncodings()
  }

  loadEncodings(){
    this.loading++
    this.encodingService.myEncodings()
      .finally(() => this.loading--)
      .subscribe( tasks => this.encodings = tasks)
  }

  onQuitEncoding(task: AppExperimentEncoding) {
    this.notify.confirm(_ => {
      this.loading++
      this.encodingService.quitEncoding(task.id)
        .finally(() => this.loading--)
        .subscribe( () => {
          this.notify.toast('Assignment Deleted')
          this.loadEncodings()
        })
    })
  }

  onTaskFormSubmit(projectForm: AppProjectForm) {
    this.loading++
    this.projectFormService.requestMyTasks(projectForm.project, projectForm.form)
      .finally(() => this.loading--)
      .subscribe( () => {
        this.closeModal()
        this.notify.toast('Tasks requested')
        this.loadEncodings()
      })
  }

  openModal(content) {
    this.modal = this.modalService.open(content)
  }
  closeModal() {
    this.modal.close()
  }

}
