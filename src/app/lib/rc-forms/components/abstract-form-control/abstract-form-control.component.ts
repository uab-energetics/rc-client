import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormEvent} from "../../form-filler/events/FormEvent";
import {FormSpec} from "../../form-spec/FormSpec";

@Component({
  selector: 'rc-abstract-form-control',
  templateUrl: './abstract-form-control.component.html',
  styleUrls: ['./abstract-form-control.component.scss']
})
export class AbstractFormControlComponent implements OnInit {

  @Input() key: string
  @Input() spec: FormSpec
  @Input() data: any
  @Input() meta: any
  @Output() events = new EventEmitter<FormEvent>()

  ngOnInit() {
    console.log(this.key)
    console.log(this.spec)
  }

}
