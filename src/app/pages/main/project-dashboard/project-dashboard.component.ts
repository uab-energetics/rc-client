import { Component, OnInit } from '@angular/core';
import {ActiveProjectService} from '../../../core/active-project/active-project.service'
import {AppProject} from '../../../core/projects/AppProject'

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  project: AppProject

  constructor(public aps: ActiveProjectService) {
    this.aps.project$.subscribe(p => this.project = p)
  }

  ngOnInit() {
  }

  idGen(name: string) {
    return name.toLowerCase().replace(/\s/, '-')
  }

}
