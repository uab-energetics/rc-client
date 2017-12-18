import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/auth/user.service";
import {AppUser} from "../../shared/auth/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService : UserService) { }

  public user : AppUser;

  ngOnInit() {
    this.user = this.userService.user;
  }

}
