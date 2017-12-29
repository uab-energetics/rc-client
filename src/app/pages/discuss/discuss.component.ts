import { Component, OnInit } from '@angular/core';
import {AppComment} from "../../models/AppComment";
import {AppChannel} from "../../models/AppChannel";
import {CommentsService} from "../../shared/services/comments.service";

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css']
})
export class DiscussComponent implements OnInit {

  ngOnInit() {
  }

}
