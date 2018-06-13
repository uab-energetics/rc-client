import { Component, OnInit, Input } from '@angular/core'
import { UserGroup } from '../../../../../core/user-groups/models/UserGroup'

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.scss']
})
export class ProjectGroupComponent implements OnInit {

  @Input()
  group: UserGroup

  constructor() { }

  ngOnInit() {
  }

}
