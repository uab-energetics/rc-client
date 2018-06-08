import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject"
import * as lodash from 'lodash'
import {InputEvent} from "../InputEvent";

// TODO - process the codebook to be iterable before passing to components

@Component({
  selector: 'rc-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit, OnChanges {

  @Input() key: string
  @Input() form: any
  @Input() spec: any
  @Input() data: any

  @Output() formInput = new EventEmitter<InputEvent>()
  childInputStream$ = new Subject<InputEvent>()

  controlsInputStream$ = new Subject()

  childSpecs: { key, spec }[]

  ngOnInit() {
    this.loadFields()
    this.childInputStream$
      .map<InputEvent, InputEvent>(event => ({ ...event, key: `${this.key}.${event.key}` }))
      .subscribe(event => this.formInput.next(event))
    this.controlsInputStream$
      .subscribe( data =>
        this.formInput.emit({ key: this.key, data }))
  }

  ngOnChanges() {
    this.loadFields()
  }

  getChildData(key: string) {
    return lodash.get(this.data, key)
  }

  private loadFields() {
    if(this.spec.type === 'group')
      this.childSpecs = Object.entries(this.spec.fields)
        .map(([key, spec]) => ({ key, spec }))
  }

}
