import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-pc-form-control',
  templateUrl: './pc-form-control.component.html',
  styleUrls: ['./pc-form-control.component.scss']
})
export class PcFormControlComponent implements OnInit {

  @Input() pcFormControl

  constructor() { }

  ngOnInit() {
  }

}
