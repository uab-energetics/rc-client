import { Component, OnInit } from '@angular/core';
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
    { text: 'Dashboard', route: '/' },
    { text: 'Publications', route: '/' },
    { text: 'Codebooks', route: '/' },
    { text: 'Data Extraction', route: '/' },
    { text: 'Conflict Resolution', route: '/' },
    { text: 'Pipelines', route: '/' },
  ]

  constructor(private auth: AuthService) {
    let open = false
    dispatcher.on('sidebar-toggle', _ => {
      open = !open
      if(open) document.body.classList.add('site-menubar-fixed', 'site-menubar-open')
      else document.body.classList.remove('site-menubar-fixed', 'site-menubar-open')
    })
  }

  ngOnInit() {
    this.auth.user.subscribe( user => this.user = user )
  }

}
