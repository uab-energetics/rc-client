import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import { User } from '../../../../core/auth/models/User'

@Component({
  selector: 'rc-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {

  @Input() users: User[] = []

  @Output() clickUser= new EventEmitter<User>()

  constructor() { }

  ngOnInit() {
  }

  onClickUser(user: User) {
    this.clickUser.emit(user)
  }

}
