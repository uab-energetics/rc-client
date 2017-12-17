import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Category, makeCategory} from "../../models/Category";
import {makeQuestion, Question} from "../../models/Question";
import * as _ from 'lodash';
import {Form} from "../../models/Form";
import {Forms} from "./formHelpers";
import {FormService} from "./FormService";
import {
  ADD_CATEGORY, ADD_QUESTION, addCategory, addQuestion, DEL_CATEGORY, DEL_QUESTION, MOVE_CATEGORY, MOVE_QUESTION,
  SELECT_CATEGORY,
  selectCategory
} from "./actions";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  providers: [MatSnackBar]
})
export class FormBuilderComponent implements OnInit {

  formService = new FormService();
  activeModal: NgbModalRef;

  @ViewChild('treeView') treeView;

  form: Form;
  activeCategory: Category;
  activeCrumbs: Category[] = [];

  showSaving = false;

  constructor(
    private modalService: NgbModal,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.formService.getForm(0);
    this.activeCategory = this.form.root_category;
    this.activeCrumbs = [this.form.root_category];
  }

  dispatch( action ){
    console.log('dispatching...', action);
    this.showSaving = true;
    switch(action.type){
      case MOVE_QUESTION:
        this.formService.moveQuestion(this.form, action.questionID, action.categoryID)
          .then( newForm => this.form = newForm )
          .catch( err => {
            this.resetForm();
            this.snackBar.open('Failed to Move Question', 'Ok', { verticalPosition: "top" });
          }).then(() => this.showSaving = false );
        break;
      case MOVE_CATEGORY:
        this.formService.moveCategory(this.form, action.categoryID, action.parentID)
          .then( newForm => this.form = newForm )
          .catch( err => {
            this.resetForm();
            this.snackBar.open('Failed to move category', 'Ok', {verticalPosition: 'top'});
          }).then(() => this.showSaving = false);
        break;
      case SELECT_CATEGORY:
        this.formService.getCategory(this.form, action.categoryID)
          .then( res => {
            this.activeCategory = res.category;
            this.activeCrumbs = res.path;
          }).catch( err => {
            this.resetForm();
          }).then(() => this.showSaving = false);
        break;
      case ADD_QUESTION:
        this.activeModal.close();
        action.question.id = _.random(1, 9999); // demo purposes only. server will return question with a good ID
        this.formService.addQuestion(this.form, action.question, action.parentID)
          .then( newForm => this.form = newForm )
          .catch( err => {
            this.resetForm();
            this.snackBar.open('Failed to add question', 'Ok', {verticalPosition: 'top'});
          }).then( () => this.showSaving = false);
        break;
      case ADD_CATEGORY:
        this.activeModal.close();
        action.category.id = _.random(1, 9999);
        this.formService.addCategory(this.form, action.category, action.parentID)
          .then( newForm => this.form = newForm )
          .catch( err => console.log(err))
          .then( () => this.showSaving = false);
        break;
      case DEL_QUESTION:
        console.log('delete question');
        this.formService.deleteQuestion(this.form, action.questionID)
          .then( newForm => this.form = newForm )
          .catch( err => console.log(err))
          .then( () => this.showSaving = false);
        break;
      case DEL_CATEGORY:
        console.log('delete category');
        this.formService.deleteCategory(this.form, action.categoryID)
          .then( newForm => this.form = newForm )
          .catch( err => console.log(err))
          .then( () => this.showSaving = false);
        break;
      default:
        this.showSaving = false;
        console.log('unknown action');
    }
  }

  onSelectCategory(categoryID: number){
    this.dispatch(selectCategory(categoryID));
  }

  onAddQuestion(question: Question){
    this.dispatch(addQuestion(question, this.activeCategory.id));
  }

  onAddCategory(category: Category){
    this.dispatch(addCategory(category, this.activeCategory.id));
  }

  // onNodeSelected({ id, type = 'category' }){
  //   if(type !== 'category') return;
  //   let searchResults = Forms.find(this.form, id);
  //   console.log(searchResults);
  //   if(!searchResults) return;
  //   this.activeCrumbs = searchResults.path;
  //   this.activeCategory = searchResults.node as Category;
  // }

  // onNodeMoved($event){
  //   console.log('moving', $event.node, 'to', $event.parent );
  //   Forms.move(this.form, $event.parent, $event.node);
  //   // mocking ajax request
  //   this.showSaving = true;
  //   setTimeout(()=>{
  //     this.showSaving = false;
  //   }, 600 * ( Math.random() * 2 + 1 ));
  // }

  // onNodeDelete({ id, type }){
  //   console.log('deleting', id);
  //   let searchResults = Forms.find(this.form, id);
  //   if(!searchResults) return;
  //   let parent = searchResults.path[searchResults.path.length-2];
  //   switch (searchResults.type){
  //     case "category":
  //       this.form = Forms.removeCategory(this.form, parent, searchResults.node as Category);
  //       return;
  //     case "question":
  //       this.form = Forms.removeQuestion(this.form, parent, searchResults.node as Question);
  //       return;
  //   }
  // }

  // selectCrumb(crumb: Category){
  //   this.onNodeSelected({ id: crumb.id });
  // }

  // onQuestionCreate(newQuestion: Question){
  //   if(this.activeModal) this.activeModal.close();
  //   this.showSaving = true;
  //   // create in server
  //   setTimeout(()=>{
  //     newQuestion.id = _.random(1, 100);
  //     this.form = Forms.addQuestion(this.form, this.activeCategory, newQuestion);
  //     this.showSaving = false;
  //   }, 2000);
  // }
  //
  // onCategoryCreate(newCategory: Category): void {
  //   if(this.activeModal) this.activeModal.close();
  //   this.showSaving = true;
  //   // create in server
  //   setTimeout(()=>{
  //     newCategory.id = _.random(1, 99999999);
  //     this.form = Forms.addCategory(this.form, this.activeCategory, newCategory);
  //     this.showSaving = false;
  //   }, 2000);
  // }

  open(content) {
    this.activeModal = this.modalService.open(content)
  }

  resetForm(){
    this.treeView.setForm(this.form);
  }

}
