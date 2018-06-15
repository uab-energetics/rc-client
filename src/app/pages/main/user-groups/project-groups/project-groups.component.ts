import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import { UserGroup } from '../../../../core/user-groups/models/UserGroup'
import {User} from "../../../../core/auth/models/User"

@Component({
  selector: 'app-project-groups',
  templateUrl: './project-groups.component.html',
  styleUrls: ['./project-groups.component.scss']
})
export class ProjectGroupsComponent implements OnInit {

  @Input() groups: UserGroup[] = []

  @Output() clickUser = new EventEmitter<User>()

  constructor() { }

  ngOnInit() {
  }

  onClickUser(user: User) {
    this.clickUser.emit(user)
  }

}
