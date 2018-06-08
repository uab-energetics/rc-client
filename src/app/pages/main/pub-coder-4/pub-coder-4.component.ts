import {Component, OnInit} from '@angular/core';

import * as lodash from 'lodash'
import {Subject} from "rxjs/Subject"

@Component({
  selector: 'app-pub-coder-4',
  templateUrl: './pub-coder-4.component.html',
  styleUrls: ['./pub-coder-4.component.scss']
})
export class PubCoder4Component implements OnInit {

  encoding = { root: {} }
  events = []
  changes$ = new Subject()

  ngOnInit() {
    this.changes$.subscribe( event => this.events.push(event) )
  }

  reduceEncoding(state, events) {
    let reducer = (state, event) => {
      switch(event.type) {
        case "pc.field.edit":
          lodash.set(state, event.payload.key.split('.'), event.payload.data)
          return state // mutating state...
      }
    }
    return events.reduce(reducer, state)
  }
}
