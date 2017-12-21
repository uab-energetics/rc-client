import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/auth/user.service";
import {AppUser} from "../../shared/auth/User";
import {EncodingService} from "../../shared/services/encoding.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user : AppUser;
  myTasks;

  constructor(
    private userService: UserService,
    private taskService: EncodingService
  ) { }


  ngOnInit() {
    this.taskService.myTasks().then( tasks => this.myTasks = tasks );
    this.user = this.userService.user;
  }

}
