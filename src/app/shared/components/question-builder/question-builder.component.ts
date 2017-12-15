import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


class QuestionModel {
  txt = '';
  desc = '';
  accepts: QuestionType[] = [];
}

class QuestionType {
  constructor(private txt: string) {}
}



@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent implements OnInit {

  /**
   * 1. set up the form model
   * 2. define the export method
   * 3. bind submit event to an output emitter that calls the export method
   */

  @Output() onSave = new EventEmitter<any>();

  questionForm: FormGroup;

  typeOptions = [
    { disp: 'Text', val: 'txt' },
    { disp: 'Number', val: 'num' },
    { disp: 'True/False', val: 'bool' }
  ];


  constructor(private fb: FormBuilder) {
    this.setupFormModel();
  }

  ngOnInit () {
  }

  save() {
    this.onSave.emit(this.exportModel());
  }

  exportModel () {
    const model = this.questionForm.value;

    const data = {
      name: model.name,
      desc: model.desc
    };

    return data;
  }

  setupFormModel () {
    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      default_type: ['txt', Validators.required],
      accepts: this.fb.array([]),
      true_val: '',
      false_val: ''
    });
  }

}
