import { Component, OnInit } from '@angular/core';
import {EncodingService} from "../../shared/services/encoding.service";
import {AppComment} from "../../models/AppComment";
import {AppChannel} from "../../models/AppChannel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
