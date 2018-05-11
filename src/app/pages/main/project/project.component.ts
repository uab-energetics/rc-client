import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {AppForm} from '../../../models/AppForm'
import {AppPublication} from '../../../models/AppPublication'
import {AppProject} from '../../../models/AppProject'
import {NotifyService} from '../../../shared/services/notify.service'
import {LoggerService} from '../../../shared/logger.service'
import {ProjectService} from '../../../shared/services/project.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  /* Data */
  projectForms: AppForm[] = [];
  projectPublications: AppPublication[] = [];
  project: AppProject;

  /* UI */
  loading = 0;

  constructor(
    private route: ActivatedRoute,
    public notify: NotifyService,
    private projectService: ProjectService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    let projectID = +this.route.snapshot.paramMap.get('id');
    this.loading++;
    this.projectService.find(projectID)
      .finally(() => this.loading--)
      .subscribe(project => this.project = project)
  }
}

export function requestStart(){
  return { type: 'request_start' }
}

export function requestEnd(){
  return { type: 'request_end' }
}
