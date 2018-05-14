import { Component, OnInit } from '@angular/core';
import {ActiveProjectService} from '../../../core/active-project/active-project.service'
import {AppProject} from '../../../core/projects/AppProject'
import {ProjectService} from '../../../core/projects/project.service'
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  project: AppProject
  statistics: any

  constructor(public aps: ActiveProjectService, public ps: ProjectService) {
    this.aps.project$
      .do( p => this.project = p )
      .filter( p => !!p )
      .switchMap( p => this.ps.getDashboard(p.id))
      .do(console.log)
      .subscribe( dashboardData => this.statistics = this.processData(dashboardData) )
  }

  ngOnInit() {
  }

  processData(stats: any) {
    let dupes = new Set()
    stats.allUsers = [ ...stats.users.encoders, ...stats.users.researchers ]
      .filter( user => {
        if(dupes.has(user.id)) return false
        dupes.add(user.id)
        return true
      })
    return stats
  }

  idGen(name: string) {
    return name.toLowerCase().replace(/\s/, '-')
  }

}
