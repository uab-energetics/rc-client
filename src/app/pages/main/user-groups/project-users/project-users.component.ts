import { Component, OnInit, Input } from '@angular/core'
import { User } from '../../../../core/auth/models/User'

@Component({
  selector: 'rc-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {

  @Input()
  users: User[] = []

  constructor() { }

  ngOnInit() {
  }

}
