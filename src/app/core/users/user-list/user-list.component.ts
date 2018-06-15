import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {User} from "../../auth/models/User"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users: User[] = []

  @Output() clickUser = new EventEmitter<User>()

  constructor() { }

  ngOnInit() {
  }

  onClickUser(user: User) {
    this.clickUser.emit(user)
  }

}
