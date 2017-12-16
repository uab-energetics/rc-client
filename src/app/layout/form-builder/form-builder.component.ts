import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {QuestionBuilderComponent} from "../../shared/components/question-builder/question-builder.component";
import {FormBuilder} from "@angular/forms";
import {Form, makeForm} from "../../models/Form";
import {Category, makeCategory} from "../../models/Category";
import {makeQuestion} from "../../models/Question";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  activeModal: NgbModalRef;
  form: Form;
  activeCategory: Category;
  activeCrumbs: string[] = [];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    let next_id = 0;

    let questions = [
      makeQuestion({ prompt: 'q1', id: next_id++ }),
      makeQuestion({ prompt: 'q2', id: next_id++ }),
      makeQuestion({ prompt: 'q3', id: next_id++ })
    ];

    let categories = [
      makeCategory({ name: 'Lighting', id: next_id++ }),
      makeCategory({ name: 'Weight', id: next_id++ }),
      makeCategory({ name: 'Enrichment', id: next_id++ }),
      makeCategory({ name: 'Temperature', id: next_id++ })
    ];

    categories[0].questions = [questions[0], questions[1]];
    categories[1].questions = [questions[2]];
    categories[2].children = [categories[3]];
    categories[1].children = [categories[2]];
    let root = makeCategory({id: next_id}, [categories[0], categories[1]]);
    this.form = makeForm({}, root);
  }

  onNodeSelected(id: number){
    let [node, crumbs] = this.dfs(id, this.form.root_category, []);
    this.activeCrumbs = crumbs;
    this.activeCategory = node;
    console.log(node, crumbs);
    // let crumbs = [];
    // /* BFS to find the corresponding form element */
    // let start = this.form.root_category;
    // let queue = [start];
    // while(queue.length > 0){
    //   let next = queue.pop();
    //   crumbs.push(next.name);
    //   if(next.id === id)
    //     this.activeCategory = next;
    //   next.questions.map( question => {
    //     if(question.id === id)
    //       this.activeCategory = next;
    //   } );
    //   next.children.forEach( cat => queue.push(cat) );
    // }
    // this.activeCrumbs = crumbs;
  }

  dfs(id: number, category: Category, crumbs: string[]) {
    crumbs.push(category.name);

    if(category.id === id)
      return [category, crumbs];

    for(let qi = 0; qi < category.questions.length; qi++)
      if(category.questions[qi].id === id)
        return [category, crumbs];

    for(let i = 0; i < category.children.length; i++){
      let next = this.dfs(id, category.children[i], crumbs);
      if(next[0] !== null) return next;
    }

    crumbs.pop();
    return [null, []];
  }

  onQuestionCreate($event){
    if(this.activeModal) this.activeModal.close();
    console.log($event);
  }

  open(content) {
    this.activeModal = this.modalService.open(content)
  }

}
