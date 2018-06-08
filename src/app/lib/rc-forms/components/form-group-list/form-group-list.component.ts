import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {FormSpec} from "../../form-spec/FormSpec"
import {ListItem} from "./ListItem"
import * as lodash from 'lodash'
import {FormEvent} from "../../form-filler/events/FormEvent";
import {responseUpdated} from "../../form-filler/events/ResponseUpdated";

@Component({
  selector: 'rc-form-group-list',
  templateUrl: './form-group-list.component.html',
  styleUrls: ['./form-group-list.component.scss']
})
export class FormGroupListComponent implements OnInit, OnChanges {

  @Input() key: string
  @Input() spec: FormSpec
  @Input() form: object
  @Input() data: any
  @Input() metaData: any

  @Output() events = new EventEmitter<FormEvent>()

  listItems: ListItem[] = []

  ngOnInit() {
  }

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
