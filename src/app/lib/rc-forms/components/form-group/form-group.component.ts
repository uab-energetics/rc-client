import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject"
import {InputEdited, rcInputEdited} from "../../../../core/rc-form-manager/events/InputEdited"
import {FormFiller} from "../../form-filler/FormFiller"

// TODO - process the codebook to be iterable before passing to components

@Component({
  selector: 'rc-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit, OnChanges {

  @Input() key: string
  @Input() form: any
  @Input() spec: any
  @Input() formFiller: FormFiller

  @Output() pcInput = new EventEmitter<InputEdited>()

  controlsInputStream$ = new Subject()

  childSpecs: { key, spec }[]

  ngOnInit() {
    this.loadFields()
    this.controlsInputStream$
      .subscribe( data =>
        this.pcInput.emit(rcInputEdited({ key: this.key, data })))
  }

  ngOnChanges() {
    this.loadFields()
  }

  private loadFields() {
    if(this.spec.type === 'group')
      this.childSpecs = Object.entries(this.spec.fields)
        .map(([key, spec]) => ({ key, spec }))
  }

}
