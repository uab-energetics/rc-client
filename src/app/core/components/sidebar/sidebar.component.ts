import { Component, OnInit } from '@angular/core';
import {dispatcher} from '../../dispatcher/dispatcher'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  linkes = [
    {
      display: ''
    }
  ]

  constructor() {
    let open = false
    dispatcher.on('sidebar-toggle', _ => {
      open = !open
      if(open) document.body.classList.add('site-menubar-fixed', 'site-menubar-open')
      else document.body.classList.remove('site-menubar-fixed', 'site-menubar-open')
    })
  }

  ngOnInit() {
  }

}
