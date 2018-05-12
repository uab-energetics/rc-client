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
  links = [
    {
      text: 'Project Dashboard',
      route: '/project-dashboard',
      icon: 'insert_chart_outlined'
    },
    {
      text: 'Encoding Tasks',
      route: '/tasks',
      icon: 'ballot'
    },
    {
      text: 'Projects',
      route: '/projects',
      icon: 'cached'
    }
  ]

  /*links = [
    {
      text: 'Dashboard',
      route: '/',
      icon: 'insert_chart_outlined'
    },
    {
      text: 'Publications',
      route: '/',
      icon: 'archive'
    },
    {
      text: 'Codebooks',
      route: '/',
      icon: 'book'
    },
    {
      text: 'Data Extraction',
      route: '/',
      icon: 'ballot'
    },
    {
      text: 'Conflict Resolution',
      route: '/',
      icon: 'done'
    },
    {
      text: 'Pipelines',
      route: '/',
      icon: 'cached'
    },
    {
      text: 'User Management',
      route: '/',
      icon: 'account_circle'
    }
  ]*/

  constructor(private auth: AuthService) {
    let open = false
    dispatcher.on('sidebar-toggle', _ => {
      open = !open
      if (open) document.body.classList.add('site-menubar-fixed', 'site-menubar-open')
      else document.body.classList.remove('site-menubar-fixed', 'site-menubar-open')
    })
  }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
  }

}
