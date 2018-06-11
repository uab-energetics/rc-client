import {Component, OnChanges, OnInit} from '@angular/core'
import * as lodash from 'lodash'
import {AbstractFormControlComponent} from "../abstract-form-control/abstract-form-control.component";

// TODO - process the codebook to be iterable before passing to components

@Component({
  selector: 'rc-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent extends AbstractFormControlComponent implements OnChanges {

  childSpecs: { key, spec }[]

  ngOnInit() {
    this.loadFields()
  }

  ngOnChanges() {
    this.loadFields()
  }

  getChildData = (key: string) =>
    lodash.get(this.data, key)

  loadFields = () =>
    this.childSpecs = Object.entries(this.spec.fields || [])
      .map(([key, spec]) => ({ key, spec }))

}
