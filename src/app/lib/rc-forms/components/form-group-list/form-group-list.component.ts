import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormSpec} from "../../form-spec/FormSpec";
import {ListItem} from "./ListItem";

@Component({
  selector: 'app-form-group-list',
  templateUrl: './form-group-list.component.html',
  styleUrls: ['./form-group-list.component.scss']
})
export class FormGroupListComponent {

  @Input() key: string
  @Input() spec: FormSpec
  @Input() form: object

  @Output() pcInput = new EventEmitter()

  listItems: ListItem[] = []

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
