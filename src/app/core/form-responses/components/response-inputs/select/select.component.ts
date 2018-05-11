import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionOption} from "../../../../form-questions/AppQuestion";

declare let $: any;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Input() value: string;
  @Input() options: QuestionOption[];
  @Output() appChange = new EventEmitter<string[]>();

  onChange($event){
    this.appChange.emit($event.value);
  }

}
