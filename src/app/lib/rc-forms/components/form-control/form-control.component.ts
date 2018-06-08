import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject"
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import {QuestionSpec} from "../../form-spec/FormSpec";
import {FormEvent} from "../../form-filler/events/FormEvent";
import {questionHidden} from "../../form-filler/events/QuestionHidden";
import {responseUpdated} from "../../form-filler/events/ResponseUpdated";

@Component({
  selector: 'rc-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input() spec: QuestionSpec
  @Input() data: any
  @Input() metaData: any
  @Input() key: string
  @Output() events = new EventEmitter<FormEvent>()

  responseUpdated$ = new Subject()
  hide$ = new Subject()
  notReported$ = new Subject()

  ngOnInit() {
    this.responseUpdated$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe( data => this.events.emit(responseUpdated({ key: this.key, data })) )

    this.hide$.subscribe(() => this.events.emit(questionHidden({ key: this.key })))
  }

}
