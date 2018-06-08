import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject";
import {InputEdited, rcInputEdited} from "../../../../core/rc-form-manager/events/InputEdited";

@Component({
  selector: 'app-pc-form-group',
  templateUrl: './pc-form-group.component.html',
  styleUrls: ['./pc-form-group.component.scss']
})
export class PcFormGroupComponent implements OnInit, OnChanges {

  @Input() key: string
  @Input() spec: any
  @Output() pcInput = new EventEmitter<InputEdited>()
  controlsInputStream$ = new Subject()

  childSpecs: { key, spec }[]

  ngOnInit() {
    this.loadFields()
    this.controlsInputStream$
      .subscribe( data =>
        this.pcInput.emit(rcInputEdited({ key: this.key, data })))
  }

  ngOnChanges() { this.loadFields() }

  private loadFields() {
    if(this.spec.type === 'group')
      this.childSpecs = Object.entries(this.spec.fields)
        .map(([key, spec]) => ({ key, spec }))
  }

}
