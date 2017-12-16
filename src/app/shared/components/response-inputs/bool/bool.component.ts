import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-bool',
  templateUrl: './bool.component.html',
  styleUrls: ['./bool.component.css']
})
export class BoolComponent {

  @Input() trueOption;
  @Input() falseOption;
  @Output() appChange = new EventEmitter();

  onChange($event: MatRadioChange){
    this.appChange.emit($event.value);
  }

}
