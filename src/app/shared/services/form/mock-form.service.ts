import { Injectable } from '@angular/core';
import {AppForm, makeForm} from "../../../models/AppForm";
import {AppQuestion, makeQuestion} from "../../../models/AppQuestion";
import {AppCategory, makeCategory} from "../../../models/AppCategory";
import {Forms} from "./formHelpers";
import * as _ from 'lodash';
import {RESPONSE_FORMATS as fmt} from "../../../models/formats";

@Injectable()
export class FormService {

  constructor() { }

  getForm(id: number){
    return buildMockForm();
  }

  addQuestion(form: AppForm, question: AppQuestion, parentID: number): Promise<AppForm> {
    return new Promise((res, rej)=>{
      let searchResults = Forms.find(form, parentID);
      if(!searchResults) rej();

      searchResults.node.questions.push(question);
      setTimeout( () => {
        res(Object.assign({}, form));
      }, 300);
    });
  }

  addCategory(form: AppForm, category: AppCategory, parentID: number): Promise<AppForm> {
    return new Promise((res, rej)=>{
      let searchResults = Forms.find(form, parentID);
      if(!searchResults) rej();

      searchResults.node.children.push(category);
      setTimeout( () => {
        res(Object.assign({}, form));
      }, 300);
    });
  }

  deleteQuestion(form: AppForm, questionID: number): Promise<AppForm> {
    let rs = Forms.find(form, questionID);
    let parent = rs.path[rs.path.length-2];
    _.pull(parent.questions, rs.node);
    return Promise.resolve(Object.assign({}, form));
  }

  deleteCategory(form: AppForm, categoryID: number): Promise<AppForm> {
    let rs = Forms.find(form, categoryID);
    let parent = rs.path[rs.path.length-2];
    _.pull(parent.children, rs.node);
    return Promise.resolve(Object.assign({}, form));
  }

  moveQuestion(form: AppForm, question, parent): Promise<AppForm> {
    return new Promise((res, rej) => {
      /* remove from parent */
      let rs = Forms.find(form, question);
      let rsp = Forms.find(form, parent);
      console.log(rs, rsp);
      if(!rs) rej();
      if(!rsp) rej();

      let currentParent = rs.path[rs.path.length-2];
      let targetParent: any = rsp.node;
      _.pull(currentParent.questions, rs.node);
      targetParent.questions.push(rs.node);
      setTimeout(()=>{
        res(Object.assign({}, form));
      }, 1000);
    });
  }

  moveCategory(form: AppForm, category, parent): Promise<AppForm> {
    return new Promise((res, rej) => {
      /* remove from parent */
      let rs = Forms.find(form, category);
      let rsp = Forms.find(form, parent);
      console.log(rs, rsp);
      if(!rs) rej();
      if(!rsp) rej();

      let currentParent = rs.path[rs.path.length-2];
      let targetParent: any = rsp.node;
      _.pull(currentParent.children, rs.node);
      targetParent.children.push(rs.node);
      setTimeout(()=>{
        res(Object.assign({}, form));
      }, 1000);
    });
  }

  getCategory(form: AppForm, id: number): Promise<any> {
    return new Promise((res, rej)=>{
      let rs = Forms.find(form, id);
      if(!rs) rej();

      let category = rs.node;
      setTimeout(()=>{
        res({
          category,
          path: rs.path
        });
      }, 300);
    });
  }

}

export function buildMockForm () {
  let mapOpts = arr => arr.map( str => { return {txt: str}});

  let next_id = 99;

  let drinks = makeQuestion({
    name: 'Select Question',
    prompt: "Pick your poison:",
    default_format: fmt.SELECT,
    id: 1,
  }, mapOpts(['Wine', 'Beer', 'Whiskey', 'Gin']));


  let movies = makeQuestion({
    name: 'Multi-Select',
    default_format: fmt.MULTI_SELECT,
    prompt: 'Which of these movies have you seen before?',
    id: 2
  }, mapOpts(['Pulp Fiction', 'The Godfather', 'Shawshank Redemption', 'Django Unchained', 'Star Wars']));

  let howAreYou = makeQuestion({
    name: 'Text Question',
    default_format: fmt.TEXT,
    prompt: "What did you do yesterday?",
    id: 3
  });

  let party = makeQuestion({
    name: "Binary Question",
    default_format: fmt.BOOLEAN,
    prompt: "Which party do you most associate with?",
    true_option: "Republican",
    false_option: "Democrat",
    id: next_id++
  });

  let age = makeQuestion({
    name: "Number Question",
    default_format: fmt.NUMBER,
    prompt: "How old are you?",
    id: 5
  });

  /* categories */
  let personal = makeCategory({
    id: next_id++,
    name: 'Personal Questions'
  }, [], [age, party]);

  let casual = makeCategory({
    id: next_id++,
    name: "Casual Questions"
  }, [], [howAreYou, movies, drinks]);

  let root = makeCategory({id: next_id, name: 'root'}, [personal, casual]);
  return makeForm({}, root);
}
