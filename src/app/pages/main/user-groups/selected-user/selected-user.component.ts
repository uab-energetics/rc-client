import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../core/auth/models/User";

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.scss']
})
export class SelectedUserComponent implements OnInit {

  @Input()
  user: User = null

  constructor() { }

  ngOnInit() {
  }

}
