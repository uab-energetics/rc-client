import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  @Input() value: string;
  @Output() appChange = new EventEmitter<string>();

  onChange($event){
    this.appChange.emit($event.target.value);
  }

}
