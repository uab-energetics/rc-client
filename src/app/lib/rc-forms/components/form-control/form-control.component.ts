import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject"
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import {QuestionSpec} from "../../form-spec/FormSpec";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input() spec: QuestionSpec
  @Input() data: any

  @Output() appChange = new EventEmitter<any>()

  changes$ = new Subject()

  ngOnInit() {
    this.changes$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe( event => this.appChange.next(event) )
  }

}
