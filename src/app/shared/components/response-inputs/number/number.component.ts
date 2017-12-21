import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent {
  @Input() value: number;
  @Output() appChange = new EventEmitter<number>();

  onChange($event){
    this.appChange.emit($event.target.value);
  }
}
