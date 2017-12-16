import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {QuestionOption} from "../../../../models/Question";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() options: QuestionOption[];
  @Output() appChange = new EventEmitter();

  onChange($event){
    this.appChange.emit($event.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
