import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormEvent} from "../../form-filler/events/FormEvent"

@Component({
  selector: 'rc-abstract-form-control',
  templateUrl: './abstract-form-control.component.html',
  styleUrls: ['./abstract-form-control.component.scss']
})
export class AbstractFormControlComponent implements OnInit {

  @Input() key: string
  @Input() spec: any
  @Input() data: any
  @Input() meta: any
  @Output() events = new EventEmitter<FormEvent>()

  resolve(specProperty: string) {
    return this.spec[specProperty]
  }

  ngOnInit() {}
}
