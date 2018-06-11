import {Component, OnChanges} from '@angular/core'
import {AbstractFormControlComponent} from "../abstract-form-control/abstract-form-control.component";
import {ArrayFiller} from "../../form-filler/ArrayFiller";
import * as lodash from "lodash";
import {Observable} from "rxjs/Observable";
import {responseUpdated} from "../../form-filler/events/ResponseUpdated";
import {responseDelete} from "../../form-filler/events/ResponseDeleted";

@Component({
  selector: 'rc-form-group-list',
  templateUrl: './form-group-list.component.html',
  styleUrls: ['./form-group-list.component.scss']
})
export class FormGroupListComponent extends AbstractFormControlComponent implements OnChanges {

  arrayFiller: ArrayFiller
  children$: Observable<{ key: string, spec: any }[]>

  ngOnChanges() {
  }

  ngOnInit() {
    this.arrayFiller = new ArrayFiller(this.spec.listItem)
    Object.keys(this.data || {}).forEach(itemKey => this.arrayFiller.add$.next(itemKey))
    this.children$ = this.arrayFiller.fields$.map( fields => {
      return Object.entries(fields).map(([key, spec]) => ({ key, spec }))
    })
  }

  addItem() {
    let key = this.arrayFiller.generateKey()
    this.events.emit(responseUpdated({ key: this.key + '.' + key, data: {} }))
  }

  deleteItem(key: string) {
    this.events.emit(responseDelete({ key }))
  }

  getChildData = (key: string) =>
    lodash.get(this.data, key)
}
