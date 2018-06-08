import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pc-form-group-list',
  templateUrl: './pc-form-group-list.component.html',
  styleUrls: ['./pc-form-group-list.component.scss']
})
export class PcFormGroupListComponent {

  @Output() pcInput = new EventEmitter()
  @Input() key: string
  @Input() spec: any

  listItems: { label: string }[] = []

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
}