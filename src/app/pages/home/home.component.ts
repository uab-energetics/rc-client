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






  channel: AppChannel = {
    id: 12,
    name: 'demo-channel',
    display_name: "Demo Channel",
    topic: "Showing the channel system",
    root_comment: comment
  }


}

const comment: AppComment = {
  user: {
    id: 13,
    name: "Chris Rocco",
    email: "chris.rocco7@gmail.com",
    image: "https://image.flaticon.com/icons/svg/149/149071.svg"
  },
  message: "Turpis exercitationem lectus feugiat, nostrum provident minim proin, etiam, eu quisquam minim arcu aspernatur? Cupiditate dictumst ipsum odit. Facilisis? Ea.",
  children: [
    {
      user: {
        id: 13,
        name: "Chris Rocco",
        email: "chris.rocco7@gmail.com",
        image: "https://image.flaticon.com/icons/svg/149/149071.svg"
      },
      message: "Turpis exercitationem lectus feugiat, nostrum provident minim proin, etiam, eu quisquam minim arcu aspernatur? Cupiditate dictumst ipsum odit. Facilisis? Ea.",
      children: []
    },
    {
      user: {
        id: 13,
        name: "Chris Rocco",
        email: "chris.rocco7@gmail.com",
        image: "https://image.flaticon.com/icons/svg/149/149071.svg"
      },
      message: "Turpis exercitationem lectus feugiat, nostrum provident minim proin, etiam, eu quisquam minim arcu aspernatur? Cupiditate dictumst ipsum odit. Facilisis? Ea.",
      children: [
        {
          user: {
            id: 13,
            name: "Chris Rocco",
            email: "chris.rocco7@gmail.com",
            image: "https://image.flaticon.com/icons/svg/149/149071.svg"
          },
          message: "Turpis exercitationem lectus feugiat, nostrum provident minim proin, etiam, eu quisquam minim arcu aspernatur? Cupiditate dictumst ipsum odit. Facilisis? Ea.",
          children: []
        }
      ]
    }
  ]
}
