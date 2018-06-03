import {Component, OnInit} from '@angular/core'
import {dispatcher} from '../../dispatcher/dispatcher'
import {AuthService} from '../../auth/auth.service'
import {User} from '../../auth/models/User'
import {AppProject} from '../../projects/AppProject'
import {ActiveProjectService} from '../../active-project/active-project.service'
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
      text: 'Publications',
      route: '/project-publications',
      icon: 'chrome_reader_mode',
      projectRequired: true
    },
    {
      text: 'Article Repositories',
      route: '/pub-repos',
      icon: 'chrome_reader_mode',
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
    },
    {
      text: 'Projects',
      route: '/projects',
      icon: 'cached'
    },
    {
      text: 'Project Pipelines',
      route: '/pipelines',
      icon: 'settings_input_component',
      projectRequired: true
    },
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
  }

  close() {
    document.body.classList.remove('site-menubar-fixed', 'site-menubar-open')
    this.navbarState = false
  }

  toggleNavbar() {
    (this.navbarState) ? this.close() : this.open()
  }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
  }

}
