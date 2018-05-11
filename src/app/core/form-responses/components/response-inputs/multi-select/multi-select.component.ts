import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {QuestionOption} from "../../../../form-questions/AppQuestion";
import {TextPayload} from "../../../../../models/AppResponse";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() selections: TextPayload[] = [];
  @Input() options: QuestionOption[];
  @Output() appChange = new EventEmitter();

  value: string[];

  onChange($event){
    let transformed = $event.value.map( v => { return { txt: v }});
    this.appChange.emit(transformed);
  }

  ngOnInit() {
    if (this.selections) {
      this.value = this.selections.map( sel => sel.txt );
    }
  }

}
