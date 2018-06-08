import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import * as lodash from 'lodash'
import {FormEvent} from "../../form-filler/events/FormEvent";

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
  @Input() metaData: any

  @Output() events = new EventEmitter<FormEvent>()

  childSpecs: { key, spec }[]

  ngOnInit() {
    this.loadFields()
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
