import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Subject} from "rxjs/Subject"
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators"

@Component({
  selector: 'app-pc-form-control',
  templateUrl: './pc-form-control.component.html',
  styleUrls: ['./pc-form-control.component.scss']
})
export class PcFormControlComponent implements OnInit {

  @Input() pcFormControl
  @Output() appChange = new EventEmitter<any>()

  changes$ = new Subject()

  ngOnInit() {
    this.changes$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe( event => this.appChange.next(event) )
  }

}
