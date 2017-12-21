import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
