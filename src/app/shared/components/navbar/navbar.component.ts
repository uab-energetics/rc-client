import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from "../../auth/user.service";
import {AppUser} from "../../../models/AppUser";
import {NotificationsService} from "../../services/notifications.service";
import {NotifyService} from "../../services/notify.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: AppUser;
  unreadNotifications = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notifications: NotificationsService,
    private notify: NotifyService,
    private router: Router
  ) {
    this.authService.changes.subscribe( user => this.user = user );
  }


  logout () {
    this.authService.logout();
  }

  ngOnInit() {
    this.user = this.userService.user;
    this.notifications.getUnread()
      .subscribe(notifications => this.unreadNotifications = notifications);
  }

  dismissNotifications(){
    if(this.unreadNotifications.length === 0) return;
    this.notifications.markAllRead()
      .subscribe(() => {
        this.notify.toast('Notifications dismissed');
        this.ngOnInit();
      })
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
