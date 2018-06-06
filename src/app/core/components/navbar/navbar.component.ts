import {Component, OnInit} from '@angular/core'
import {NotificationsService} from '../../notifications/notifications.service'
import {NotifyService} from '../../notifications/notify.service'
import {AuthService} from '../../auth/auth.service'
import {dispatcher} from '../../dispatcher/dispatcher'
import {ActiveProjectService} from '../../active-project/active-project.service'
import {AppProject} from '../../projects/AppProject'
import {OPEN_PROJECT_LIST} from '../../projects/actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activeProject: AppProject
  unreadNotifications = [];

  sidebarState = 0

  constructor(
    public authService: AuthService,
    public activeProjectService: ActiveProjectService,
    private notifications: NotificationsService,
    private notify: NotifyService
  ) {
    dispatcher.on('sidebar-opened', () => this.sidebarState = 1)
    dispatcher.on('sidebar-closed', () => this.sidebarState = 0)
  }

  ngOnInit() {
    this.activeProjectService.project$.subscribe( p => this.activeProject = p )
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

  showProjects() {
    dispatcher.emit(OPEN_PROJECT_LIST)
  }

  toggleSidebar() {
    dispatcher.emit('sidebar-toggle')
  }
}
