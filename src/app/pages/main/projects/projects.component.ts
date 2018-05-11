import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../core/projects/project.service";
import {AppProject} from "../../../core/projects/AppProject";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotifyService} from "../../../core/notifications/notify.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: AppProject[];
  editingProject: AppProject;
  showLoader = false;

  constructor(
    private projectService: ProjectService,
    private modals: NgbModal,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    this.showLoader = true;
    this.projectService.myProjects()
      .subscribe(
      projects => {
        this.projects = projects;
        this.showLoader = false;
      }
    )
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id)
      .subscribe(() => this.loadProjects());
  }


  modal: NgbActiveModal;

  editProject(project: AppProject, modal){
    this.editingProject = project;
    this.modal = this.modals.open(modal);
  }

  updateProject(project: AppProject){
    this.modal.close();
    this.showLoader = true;
    this.projectService.updateProject(project)
      .finally(() => this.showLoader = false)
      .subscribe(() => {
        this.notify.toast('Project updated');
        this.loadProjects();
      })
  }

}
