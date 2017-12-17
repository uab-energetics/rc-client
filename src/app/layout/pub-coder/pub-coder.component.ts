import { Component, OnInit } from '@angular/core';
import {FormService} from "../../shared/services/form/form.service";
import {Form} from "../../models/Form";
import {CategoryUpdate} from "../../shared/components/form/category/category.component";

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  formModel: Form;
  encoding = {};

  constructor(
    private formService: FormService
  ) { }

  ngOnInit() {
    this.formModel = this.formService.getForm(-1);
  }

  onCategoryUpdate($event: CategoryUpdate){
    let {question, type, payload} = $event;
    if(!(question.id in this.encoding))
      this.encoding[question.id] = {};
    Object.assign(this.encoding[question.id], payload, { type });
  }

}
