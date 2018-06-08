import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject"
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import {QuestionSpec} from "../../form-spec/FormSpec";
import {FormEvent} from "../../form-filler/events/FormEvent";
import {questionShowHide} from "../../form-filler/events/QuestionShowHide";
import {responseUpdated} from "../../form-filler/events/ResponseUpdated";
import * as lodash from 'lodash'
import {RcFormMetaData} from "../../form-filler/types/RcFormMetaData";
import {questionReported} from "../../form-filler/events/QuestionReported";

@Component({
  selector: 'rc-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input() spec: QuestionSpec
  @Input() data: any
  @Input() metaData: RcFormMetaData
  @Input() key: string
  @Output() events = new EventEmitter<FormEvent>()

  _meta

  responseUpdated$ = new Subject()
  hide$ = new Subject()
  notReported$ = new Subject()

  ngOnInit() {
    this._meta = lodash.get(this.metaData, this.key, {})
    this.responseUpdated$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe( data => this.events.emit(responseUpdated({ key: this.key, data })) )

    this.hide$.subscribe(() => this.events.emit(questionShowHide({ key: this.key, state: false })))
    this.notReported$.subscribe(() => this.events.emit(questionReported({ key: this.key, state: false })))
  }

  ngOnChanges() {
    console.log(this.metaData)
  }

}
