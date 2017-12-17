import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Category} from "../../models/Category";
import {Question} from "../../models/Question";
import * as _ from 'lodash';
import {Form} from "../../models/Form";
import {FormService} from "./FormService";
import {
  ADD_CATEGORY, ADD_QUESTION, addCategory, addQuestion, DEL_CATEGORY, DEL_QUESTION, MOVE_CATEGORY, MOVE_QUESTION,
  SELECT_CATEGORY,
  selectCategory, SHOW_ADD_QUESTION
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
  @ViewChild('questionModalContent') questionModalContent;

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
        return this.formService.getCategory(this.form, action.categoryID)
          .then( res => {
            this.activeCategory = res.category;
            this.activeCrumbs = res.path;
          }).catch( err => {
            this.resetForm();
          }).then(() => this.showSaving = false);
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
      case SHOW_ADD_QUESTION:
        this.dispatch(selectCategory(action.categoryID))
          .then(() => this.open(this.questionModalContent));
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

  open(content) {
    this.activeModal = this.modalService.open(content)
  }

  resetForm(){
    this.treeView.setForm(this.form);
  }

}
