import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppQuestion} from '../../../form-questions/AppQuestion';
import {propName, RESPONSE_FORMATS as fmt} from '../../formats';
import {AppResponse} from '../../AppResponse';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html'
})
export class DynamicInputComponent implements OnInit {

  @Input() question: AppQuestion;
  @Input() type: string;
  @Input() response: AppResponse;

  @Output() onChange = new EventEmitter<AppResponse>();

  data;

  fmt = fmt;

  handleChange(data){
    let prop = propName(this.type);

    this.onChange.emit(Object.assign(
      {},
      this.response,
      { [prop]: data },
      { type: this.type }
    ));
  }

  ngOnInit(){

    let find = (prop, def) => this.response[prop] !== null ? this.response[prop] : def;

    switch(this.type){
      case fmt.TEXT:
        this.data = find(propName(fmt.TEXT), '');
        break;
      case fmt.NUMBER:
        this.data = find(propName(fmt.NUMBER), null);
        break;
      case fmt.SELECT:
        this.data = find(propName(fmt.SELECT), '');
        break;
      case fmt.MULTI_SELECT:
        this.data = find(propName(fmt.MULTI_SELECT), []);
        break;
      case fmt.BOOLEAN:
        this.data = find(propName(fmt.BOOLEAN), null);
        break;
    }
  }
}
