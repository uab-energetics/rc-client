import {Component, OnChanges} from '@angular/core'
import {ListItem} from "./ListItem"
import * as lodash from 'lodash'
import {responseUpdated} from "../../form-filler/events/ResponseUpdated"
import {AbstractFormControlComponent} from "../abstract-form-control/abstract-form-control.component";

@Component({
  selector: 'rc-form-group-list',
  templateUrl: './form-group-list.component.html',
  styleUrls: ['./form-group-list.component.scss']
})
export class FormGroupListComponent extends AbstractFormControlComponent implements OnChanges {

  listItems: ListItem[] = []

  ngOnChanges() {
    this.listItems = Object.entries(this.data || {}).map(([key, val]) => ({ label: key }))
  }

  listItemAdd() {
    let label = prompt("Give the item a label:")
    if(!label) return
    this.listItems.push({ label })
    this.events.emit(responseUpdated({ key: `${this.key}.${label}`, data: { label }}))
  }

  listItemEdit(label) {
    let oldItem = this.listItems.filter(L => L.label === label)
    if(oldItem.length !== 1)
      return console.error("No list item with that label")

    let newLabel = prompt("Enter a new label:")
    if(!newLabel || newLabel === label) return

    oldItem[0].label = newLabel
  }

  listItemDelete(label) {
    this.listItems = this.listItems.filter(L => L.label !== label)
  }

  setPanelState(label, state) {
    if(this.data[label].expanded === state) return
    setTimeout(() => this.events.emit(responseUpdated({ key: `${this.key}.${label}.expanded`, data: state})), 0)
  }

  getChildData(key: string): any {
    return lodash.get(this.data, key)
  }
}
