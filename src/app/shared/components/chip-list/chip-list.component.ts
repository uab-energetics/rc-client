import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {MatChipInputEvent} from "@angular/material";

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css']
})
export class ChipListComponent implements OnInit {

  @Input() chips = [];
  @Output() onChange = new EventEmitter<any>();

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.chips.push(value);
      this.onChange.emit(this.chips);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(chip: any): void {
    let index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
