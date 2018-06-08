import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'rc-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberControl {
  @Input() placeholder: string = "Enter a value.."
  @Input() value: number
  @Output() appChange = new EventEmitter<number>()
}
