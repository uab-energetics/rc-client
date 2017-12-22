import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from "../../auth/user.service";
import {AppUser} from "../../../models/AppUser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: AppUser;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}


  logout () {
    this.authService.logout();
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
