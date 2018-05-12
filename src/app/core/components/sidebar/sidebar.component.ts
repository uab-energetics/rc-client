import {Component, OnInit} from '@angular/core'
import {dispatcher} from '../../dispatcher/dispatcher'
import {AuthService} from '../../auth/auth.service'
import {User} from '../../auth/models/User'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User
  navbarState = false
  links = [
    {
      text: 'Project Dashboard',
      route: '/project-dashboard',
      icon: 'insert_chart_outlined'
    },
    {
      text: 'Codebooks',
      route: '/project-codebooks',
      icon: 'ballot'
    },
    {
      text: 'Publications',
      route: '/project-publications',
      icon: 'chrome_reader_mode'
    },
    {
      text: 'User Management',
      route: '/project-users',
      icon: 'account_circle'
    },
    {
      text: 'Encoding Tasks',
      route: '/tasks',
      icon: 'assignment'
    },
    {
      text: 'Projects',
      route: '/projects',
      icon: 'cached'
    }
  ]

  constructor(private auth: AuthService) {
    dispatcher.on('sidebar-toggle', _ => this.toggleNavbar())
  }

  openNavbar() {
    document.body.classList.add('site-menubar-fixed', 'site-menubar-open')
  }

  closeNavbar() {
    document.body.classList.remove('site-menubar-fixed', 'site-menubar-open')
  }

  toggleNavbar() {
    this.navbarState = !this.navbarState
    if (this.navbarState) return this.openNavbar()
    return this.closeNavbar()
  }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
  }

}
