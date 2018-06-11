import {Component, OnInit} from '@angular/core'
import {dispatcher} from '../../../core/dispatcher/dispatcher'
import {AuthService} from '../../../core/auth/auth.service'
import {User} from '../../../core/auth/models/User'
import {AppProject} from '../../../core/projects/AppProject'
import {ActiveProjectService} from '../../../core/active-project/active-project.service'
import {SidebarLink} from './SidebarLink'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User
  project: AppProject
  navbarState = false
  links: SidebarLink[] = [
    {
      text: 'Projects',
      route: '/projects',
      icon: 'cached'
    },
    {
      text: 'Project Dashboard',
      route: '/project-dashboard',
      icon: 'insert_chart_outlined',
      projectRequired: true
    },
    {
      text: 'Codebooks',
      route: '/project-codebooks',
      icon: 'ballot',
      projectRequired: true
    },
    {
      text: 'Article Repos',
      route: '/pub-repos',
      icon: 'cloud_done',
      projectRequired: true
    },
    {
      text: 'User Management',
      route: '/project-users',
      icon: 'account_circle',
      projectRequired: true
    },
    {
      text: 'Encoding Tasks',
      route: '/tasks',
      icon: 'assignment'
    }
  ]

  constructor(private auth: AuthService, private aps: ActiveProjectService) {
    dispatcher.on('sidebar-toggle', _ => this.toggleNavbar())
    aps.project$.subscribe( p => this.project = p )
  }

  loadLinks() {
    if(this.project) return this.links
    return this.links.filter( l => !l.projectRequired )
  }

  open() {
    document.body.classList.add('site-menubar-fixed', 'site-menubar-open')
    this.navbarState = true
    dispatcher.emit('sidebar-opened')
  }

  close() {
    document.body.classList.remove('site-menubar-fixed', 'site-menubar-open')
    this.navbarState = false
    dispatcher.emit('sidebar-closed')
  }

  toggleNavbar() {
    (this.navbarState) ? this.close() : this.open()
  }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
  }

}
