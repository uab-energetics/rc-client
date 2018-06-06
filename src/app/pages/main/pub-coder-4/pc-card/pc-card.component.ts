import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pc-card',
  templateUrl: './pc-card.component.html',
  styleUrls: ['./pc-card.component.scss']
})
export class PcCardComponent implements OnInit {

  @Input() title: string
  @Input() desc: string
  @Input() active: boolean

  constructor() { }

  ngOnInit() {
  }

}
