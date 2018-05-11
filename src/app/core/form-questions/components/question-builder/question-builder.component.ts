import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppQuestion, makeQuestion, QuestionOption, QuestionResponseType} from "../../AppQuestion";
import {RESPONSE_FORMATS, RESPONSE_FORMATS as fmt} from "../../../form-responses/formats";



const defaultModel = {
  name: '',
  desc: '',
  prompt: '',
  default_format: fmt.TEXT,
  accepts: [],
  true_option: 'Yes',
  false_option: 'No',
  options: []
};



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
  _question: AppQuestion;
  @Input()
  set question( question: AppQuestion ){
    this._question = question;
    console.log(JSON.stringify(question, null, 2));
    this.setupFormModel(question);
  }

  @Output() appSave = new EventEmitter<any>();

  questionForm: FormGroup;

  typeOptions = [
    { disp: 'Text', val: fmt.TEXT },
    { disp: 'Number', val: fmt.NUMBER },
    { disp: 'True/False', val: fmt.BOOLEAN },
    { disp: 'Select', val: fmt.SELECT },
    { disp: 'Multi-Select', val: fmt.MULTI_SELECT }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
  }

  save () {
    this.appSave.emit(this.exportModel());
  }

  exportModel () {
    const model = this.questionForm.value;

    let options: QuestionOption[] = model.options.map( opt => { return {"txt": opt} });
    let accepts: QuestionResponseType[] = model.accepts.map( opt => { return {"type": opt} });

    let default_type = accepts.filter( obj => obj.type === model.default_format );
    if(default_type.length == 0) accepts.push({ type: model.default_format }); // make sure it accepts the default format

    return Object.assign({}, this._question, {
      name: model.name,
      prompt: model.prompt,
      description: model.desc,
      default_format: model.default_format,
      true_option: model.true_option,
      false_option: model.false_option,
      options,
      accepts
    });
  }

  setupFormModel (question: AppQuestion) {
    console.log('question: ', question);

    let initialState: any = { ...question };
    if(!initialState) initialState = defaultModel;

    initialState.options = initialState.options || [];
    initialState.accepts = initialState.accepts || [];
    initialState.options = initialState.options.map( opt => opt.txt );
    initialState.accepts = initialState.accepts.map( opt => opt.type );

    console.log('state: ', initialState);

    this.questionForm = this.fb.group({
      name: [initialState.name, Validators.required],
      desc: [initialState.description],
      prompt: [initialState.prompt, Validators.required],
      default_format: [initialState.default_format, Validators.required],
      accepts: [initialState.accepts],
      true_option: initialState.true_option,
      false_option: initialState.false_option,
      options: [initialState.options]
    });
  }

  hasOptions(){
    let fmt = this.questionForm.get('default_format').value;
    return (fmt === RESPONSE_FORMATS.MULTI_SELECT || fmt === RESPONSE_FORMATS.SELECT);
  }

  updateChips(chips: string[]){
    console.log(chips);
    this.questionForm.patchValue({ options: chips });
    console.log(this.questionForm);
  }

}
