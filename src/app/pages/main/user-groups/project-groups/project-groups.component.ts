import { Component, OnInit, Input } from '@angular/core'
import { UserGroup } from '../../../../core/user-groups/models/UserGroup'

@Component({
  selector: 'app-project-groups',
  templateUrl: './project-groups.component.html',
  styleUrls: ['./project-groups.component.scss']
})
export class ProjectGroupsComponent implements OnInit {

  @Input()
  groups: UserGroup[] = []

  constructor() { }

  ngOnInit() {
  }

}
