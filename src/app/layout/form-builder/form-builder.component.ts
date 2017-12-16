import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {QuestionBuilderComponent} from "../../shared/components/question-builder/question-builder.component";
import {FormBuilder} from "@angular/forms";

import {form} from "./../../../../test/data/form";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  activeModal: NgbModalRef;

  form = form;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  onQuestionCreate($event){
    if(this.activeModal) this.activeModal.close();
    console.log($event);
  }

  open(content) {
    this.activeModal = this.modalService.open(content)
  }

}
