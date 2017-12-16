import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {MatChipInputEvent} from "@angular/material";

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css']
})
export class ChipListComponent implements OnInit {

  _chips: string[] = [];

  @Input()
  set chips( chips: string[] ){
    this._chips = chips || [];
  }

  @Output() onChange = new EventEmitter<any>();

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this._chips.push(value);
      this.onChange.emit(this._chips);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(chip: any): void {
    let index = this._chips.indexOf(chip);

    if (index >= 0) {
      this._chips.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
