import {Component, OnInit} from '@angular/core'
import {Subject} from "rxjs/Subject"
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import {questionShowHide} from "../../form-filler/events/QuestionShowHide"
import {responseUpdated} from "../../form-filler/events/ResponseUpdated"
import * as lodash from 'lodash'
import {questionReported} from "../../form-filler/events/QuestionReported"
import {leaveComment} from "../../form-filler/events/Comment";
import {AbstractFormControlComponent} from "../abstract-form-control/abstract-form-control.component";

@Component({
  selector: 'rc-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent extends AbstractFormControlComponent implements OnInit {

  _meta

  responseUpdated$ = new Subject()
  visible$ = new Subject()
  reported$ = new Subject<boolean>()
  addComment$ = new Subject<{ key: string, comment: string }>()

  ngOnInit() {
    this._meta = lodash.get(this.meta, this.key, { reported: true })
    this.responseUpdated$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe( data => this.events.emit(responseUpdated({ key: this.key, data })) )

    this.visible$.subscribe(state => this.events.emit(questionShowHide({ key: this.key, state })))
    this.reported$.subscribe(state => this.events.emit(questionReported({ key: this.key, state })))
    this.addComment$.subscribe(comment => this.events.emit(leaveComment(comment)))
  }

  ngOnChanges() {
    console.log(this.meta)
  }

}
