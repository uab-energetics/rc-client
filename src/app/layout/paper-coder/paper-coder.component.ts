import {Component, OnInit} from '@angular/core';
import {makeQuestion, Question} from "../../models/Question";
import {Subject} from "rxjs/Subject";
import {RESPONSE_FORMATS as fmt} from "../../models/formats";

@Component({
  selector: 'app-paper-coder',
  templateUrl: './paper-coder.component.html',
  styleUrls: ['./paper-coder.component.css']
})
export class PaperCoderComponent implements OnInit {

  testQuestions: Question[] = [];
  responseSubject: Subject<any> = new Subject();

  // tmp
  encoding = {};

  constructor() {

    let id_cnt = 0;

    this.testQuestions.push(makeQuestion({
      id: id_cnt++,
      name: 'Working!',
      prompt: 'How are you feeling today?',
      default_format: fmt.TEXT
    }));

    this.testQuestions.push(makeQuestion({
      id: id_cnt++,
      name: "Number Question",
      prompt: 'How old are you?',
      default_format: fmt.NUMBER
    }));

    this.testQuestions.push(makeQuestion({
      id: id_cnt++,
      name: "Binary Question",
      prompt: "Which party do you most associate with?",
      default_format: fmt.BOOLEAN,
      true_option: 'Republican',
      false_option: 'Democrat'
    }));

    let selectOptions = [
      'Whiskey',
      'Gin',
      'Beer',
      'Wine'
    ].map( str => {return {txt: str}});
    this.testQuestions.push(makeQuestion({
      id: id_cnt++,
      name: "Select Question",
      prompt: "Pick your Poison:",
      default_format: fmt.SELECT
    }, selectOptions));

    let multiSelectOptions = [
      'Pulp Fiction',
      'Shawkshank Redemption',
      'Django Unchained',
      'The Godfather',
      'Star Wars'
    ].map( str => {return {txt: str}});
    this.testQuestions.push(makeQuestion({
      id: id_cnt++,
      name: "Multi-Select Question",
      prompt: "Which of these movies have you seen?",
      default_format: fmt.MULTI_SELECT
    }, multiSelectOptions));

    console.log(this.testQuestions);
  }

  ngOnInit() {
    this.responseSubject.subscribe( resChange => {
      let {question, payload, type} = resChange;
      let qid = question.id;

      if(!this.encoding[qid]){
        this.encoding[qid] = {};
      }

      Object.assign(
        this.encoding[question.id],
        payload,
        {type: type},
        {question_id: qid}
        );

      console.log('recieved', resChange);
    });
  }

}
