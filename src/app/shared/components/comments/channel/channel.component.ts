import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  @Input() channel;

  constructor() { }

  ngOnInit() {
  }

  replyMessage: FormControl = new FormControl('');

  onPostComment(){
    console.log("posting comment... ");
    this.replyMessage = new FormControl('');
  }

}
