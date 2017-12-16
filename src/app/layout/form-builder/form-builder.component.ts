import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Form, form_add, form_dfs, form_move, makeForm} from "../../models/Form";
import {Category, makeCategory} from "../../models/Category";
import {makeQuestion, Question} from "../../models/Question";
import * as _ from 'lodash';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  activeModal: NgbModalRef;
  form: Form;
  activeCategory: Category;
  activeCrumbs: Category[] = [];

  showSaving = false;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    let next_id = 0;

    let options = ['Wine', 'Beer', 'Whiskey'].map(str => {return {txt: str}});
    let questions = [
      makeQuestion({ name: 'q1', id: next_id++ }),
      makeQuestion({ name: 'Drinks', default_format: 'multi-sel', id: next_id++ }, options),
      makeQuestion({ name: 'q3', id: next_id++ })
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
    let root = makeCategory({id: next_id, name: 'root'}, [categories[0], categories[1]]);
    this.form = makeForm({}, root);
    this.onNodeSelected(this.form.root_category.id);
  }

  onNodeSelected(id: number){
    let res = form_dfs(this.form, id);
    if(res){
      this.activeCrumbs = res.path;
      this.activeCategory = res.path[res.path.length-1];
    }
    console.log(res);
  }

  onNodeMoved($event){
    console.log('moving', $event.node, 'to', $event.parent );
    form_move(this.form, $event.parent, $event.node);
    // mocking ajax request
    this.showSaving = true;
    setTimeout(()=>{
      this.showSaving = false;
    }, 600 * ( Math.random() * 2 + 1 ));
  }

  selectCrumb(crumb: Category){
    this.onNodeSelected(crumb.id);
  }

  onQuestionCreate(newQuestion: Question){
    if(this.activeModal) this.activeModal.close();
    this.showSaving = true;
    // create in server
    setTimeout(()=>{
      newQuestion.id = _.random(1, 100);
      let newForm = form_add(this.form, this.activeCategory, newQuestion, 'question');
      this.form = Object.assign({}, newForm);
      this.showSaving = false;
    }, 2000);
  }

  open(content) {
    this.activeModal = this.modalService.open(content)
  }

}
