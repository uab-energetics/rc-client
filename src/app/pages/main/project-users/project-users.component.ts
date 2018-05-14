import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {AppForm} from '../../../core/forms/AppForm'
import {AppPublication} from '../../../core/publications/AppPublication'
import {AppProject} from '../../../core/projects/AppProject'
import {NotifyService} from '../../../core/notifications/notify.service'
import {ProjectService} from '../../../core/projects/project.service'
import {ActiveProjectService} from '../../../core/active-project/active-project.service'

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css']
})
export class ProjectUsersComponent implements OnInit {

  /* Data */
  projectForms: AppForm[] = [];
  projectPublications: AppPublication[] = [];
  project: AppProject;

  /* UI */
  loading = 0;

  constructor(
    private route: ActivatedRoute,
    public notify: NotifyService,
    private aps: ActiveProjectService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    this.aps.project$
      .subscribe( p => this.project = p )
  }

  // loadProject() {
  //   let projectID = +this.route.snapshot.paramMap.get('id');
  //   this.loading++;
  //   this.projectService.find(projectID)
  //     .finally(() => this.loading--)
  //     .subscribe(project => this.project = project)
  // }
}

export function requestStart(){
  return { type: 'request_start' }
}

export function requestEnd(){
  return { type: 'request_end' }
}
