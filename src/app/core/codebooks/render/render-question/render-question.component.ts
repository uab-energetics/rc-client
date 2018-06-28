import {Component, Input, OnInit} from '@angular/core';
import {AppQuestion} from "../../../form-questions/AppQuestion";

@Component({
  selector: 'app-render-question',
  templateUrl: './render-question.component.html',
  styleUrls: ['./render-question.component.scss']
})
export class RenderQuestionComponent implements OnInit {

  @Input() question: AppQuestion

  fmt: string

  constructor() { }

  ngOnInit() {
    this.fmt = this.question.default_format
  }

}
