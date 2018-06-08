import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'rc-bool',
  templateUrl: './bool.component.html',
  styleUrls: ['./bool.component.css']
})
export class BoolControl {

  @Input() value
  @Input() trueOption
  @Input() falseOption
  @Output() appChange = new EventEmitter()

}
