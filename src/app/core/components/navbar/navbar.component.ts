import {Component, OnInit} from '@angular/core'
import {NotificationsService} from '../../notifications/notifications.service'
import {NotifyService} from '../../notifications/notify.service'
import {Router} from '@angular/router'
import {AuthService} from '../../auth/auth.service'
import {dispatcher} from '../../dispatcher/dispatcher'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  unreadNotifications = [];

  constructor(
    public authService: AuthService,
    private notifications: NotificationsService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit() {
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

  toggleSidebar() {
    dispatcher.emit('sidebar-toggle')
  }
}
