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
  activeTabIndex: number

  // see the tab definitions at the bottom of the file


  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private projectFormService: ProjectFormService,
    private notify: NotifyService
  ) {
  }

  ngOnInit() {
    this.loadAllTabs()
  }

  loadAllTabs() {
    for (let i = 0; i < this.tabs.length; i++) {
      this.refreshTab(i)
    }
  }

  refreshActiveTab() {
    this.refreshTab(this.activeTabIndex)
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].inSync = false
    }
    this.tabs[this.activeTabIndex].inSync = true
  }

  refreshTab(index: number) {
    const tab = this.tabs[index]
    tab.paginator = new Paginator<AppEncodingTask>(params => this.taskService.myTasks(params, tab.status))
    tab.inSync = true
  }

  quitTask(task: AppEncodingTask) {
    this.notify.confirm(() => {
      this.taskService.quitTask(task.id)
        .subscribe(() => {
          this.notify.toast('Task Deleted')
          this.refreshActiveTab()
        })
    })
  }


  onTaskFormSubmit(projectForm: AppProjectForm) {
    this.projectFormService.requestMyTasks(projectForm.project, projectForm.form)
      .subscribe(() => {
        this.closeModal()
        this.notify.toast('Tasks requested')
        this.refreshActiveTab()
      })
  }

  openModal(content) {
    this.modal = this.modalService.open(content)
  }

  closeModal() {
    this.modal.close()
  }

  onActiveTabChange(index: number) {
    this.activeTabIndex = index
    if (this.shouldRefreshTab(index)) {
      this.refreshTab(index)
    }
  }

  shouldRefreshTab(index: number) {
    return !this.tabs[index].inSync
  }

  tabs: TaskListTab[] = [
    {
      label: "All",
      status: null,
      promptStatus: 'complete',
      showEmptyPrompt: true,
      inSync: false,
    },
    {
      label: "Pending",
      status: 'pending',
      promptStatus: 'pending',
      showEmptyPrompt: true,
      inSync: false,
    },
    {
      label: "In Progress",
      status: 'in_progress',
      promptStatus: 'in progress',
      showEmptyPrompt: false,
      inSync: false,
    },
    {
      label: "Complete",
      status: 'complete',
      promptStatus: 'complete',
      showEmptyPrompt: false,
      inSync: false,
    }
  ]

}

interface TaskListTab {
  paginator?: Paginator<AppEncodingTask>,
  label: string,
  status: string,
  promptStatus: string,
  showEmptyPrompt: boolean,
  inSync: boolean
}
