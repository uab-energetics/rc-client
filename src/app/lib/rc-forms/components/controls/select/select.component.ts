import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'rc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectControl {

  @Input() value: string
  @Input() options: string[]
  @Input() placeholder: string = "Select One:"
  @Output() appChange = new EventEmitter<string[]>()

}
