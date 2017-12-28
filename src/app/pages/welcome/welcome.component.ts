import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add('page-aside-static', 'page-aside-left');
  }

  ngOnDestroy() {
    document.body.classList.remove('page-aside-static', 'page-aside-left');
  }

}
