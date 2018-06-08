import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  @Input() value: string = '';
  @Input() placeholder: string = 'Enter some text...'
  @Output() appChange = new EventEmitter<string>();

}
