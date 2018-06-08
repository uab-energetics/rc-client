import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormSpec} from "../../form-spec/FormSpec";
import {ListItem} from "./ListItem";
import * as lodash from 'lodash'
import {Subject} from "rxjs/Subject";
import {InputEvent} from "../InputEvent";

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

  @Output() formInput = new EventEmitter<InputEvent>()
  childInputStream$ = new Subject<InputEvent>()

  listItems: ListItem[] = []

  ngOnInit() {
    this.childInputStream$
      .map<InputEvent, InputEvent>(event => ({ ...event, key: `${this.key}.${event.key}`}))
      .subscribe(event => this.formInput.emit(event))
  }

  ngOnChanges() {
    this.listItems = Object.entries(this.data || {}).map(([key, val]) => ({ label: key }))
  }

  listItemAdd() {
    let label = prompt("Give the item a label:")
    if(!label) return
    this.listItems.push({ label })
    this.formInput.emit({ key: `${this.key}.${label}`, data: { label }})
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
    setTimeout(() => this.formInput.emit({ key: `${this.key}.${label}.expanded`, data: state}), 0)
  }

  getChildData(key: string): any {
    return lodash.get(this.data, key)
  }
}
