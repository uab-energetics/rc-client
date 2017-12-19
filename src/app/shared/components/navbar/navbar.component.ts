import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from "../../auth/user.service";
import {AppUser} from "../../auth/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService : UserService
  ) {}

  public user : AppUser;

  logout () {
    this.authService.logout();
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
