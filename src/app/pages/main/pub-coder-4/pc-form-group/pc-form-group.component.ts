import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject";
import {pcEditField} from "../actions/EditField";

@Component({
  selector: 'app-pc-form-group',
  templateUrl: './pc-form-group.component.html',
  styleUrls: ['./pc-form-group.component.scss']
})
export class PcFormGroupComponent implements OnInit, OnChanges {

  @Output() appChange = new EventEmitter()

  @Input() pcFormGroup
  @Input() key: string

  changes$ = new Subject()

  _entries: { key, group }[]
  listItems: { label: string }[] = []

  ngOnInit() {
    this.loadFields()
    this.changes$
      .subscribe( data => this.appChange.emit(pcEditField({ key: this.key, data })))
    console.log(this.key)
  }

  ngOnChanges() {
    this.loadFields()
  }

  listItemAdd() {
    let label = prompt("Give the item a label:")
    if(!label) return
    this.listItems.push({ label })
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

  getWrapperClass(field) {
    return {
      'pc-question': field.type !== 'group',
      'pc-group': field.type === 'group'
    }
  }

  private loadFields() {
    if(this.pcFormGroup.list)
      this.listItems = []
    if(this.pcFormGroup.type === 'group')
      this._entries = Object.entries(this.pcFormGroup.fields)
        .map(([key, group]) => ({ key, group }))
  }

}
