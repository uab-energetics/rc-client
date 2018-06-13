import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { User } from '../../../core/auth/models/User'
import { UserGroup } from '../../../core/user-groups/models/UserGroup'
import { ActiveProjectService } from '../../../core/active-project/active-project.service'
import { AppProject } from '../../../core/projects/AppProject'
import { UserGroupService } from '../../../core/user-groups/user-group.service'
import { ProjectService } from '../../../core/projects/project.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {

  constructor(
    private activeProjectService: ActiveProjectService,
    private userGroupService: UserGroupService
  ) { }

  project: AppProject

  selectedUser$: Subject<User> = new Subject()
  projectUsers$: Subject<User[]> = new Subject()
  projectGroups$: Subject<UserGroup[]> = new Subject()
  

  ngOnInit() {
    this.activeProjectService.project$
      .filter(project => !!project)
      .subscribe( project => {
        this.project = project
        this.userGroupService.getProjectGroups(project.id)
          .subscribe( grps => this.projectGroups$.next(grps))
        this.userGroupService.getProjectUsers(project.id)
          .subscribe(users => {
            this.projectUsers$.next(users)
            this.selectedUser$.next(users[0] || null)
          })
      })
    
  }

}
