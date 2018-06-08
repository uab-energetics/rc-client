import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rc-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectControl {

  @Input() selections: string[] = [];
  @Input() placeholder: string = "Select Multiple:"
  @Input() options: string[];
  @Output() appChange = new EventEmitter();

}
