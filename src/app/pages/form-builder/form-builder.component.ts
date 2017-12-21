import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AppCategory} from "../../models/AppCategory";
import {AppQuestion} from "../../models/AppQuestion";
import * as _ from 'lodash';
import {AppForm} from "../../models/AppForm";
import {
  ADD_CATEGORY, ADD_QUESTION, addCategory, addQuestion, DEL_CATEGORY, DEL_QUESTION, MOVE_CATEGORY, MOVE_QUESTION,
  SELECT_CATEGORY,
  selectCategory, SHOW_ADD_QUESTION
} from "./actions";
import {MatSnackBar} from "@angular/material";
import {FormService} from "../../shared/services/form/form.service";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  providers: [MatSnackBar, FormService]
})
export class FormBuilderComponent implements OnInit {

  activeModal: NgbModalRef;

  @ViewChild('treeView') treeView;
  @ViewChild('questionModalContent') questionModalContent;

  _form: AppForm;
  set form(form: AppForm) {
    this._form = form;
    if(!this.activeCategory)
      this.activeCategory = form.root_category;
    this.selectCategory(this.activeCategory.id)
  }
  get form(){
    return this._form;
  }

  activeCategory: AppCategory;
  activeCrumbs: AppCategory[] = [];

  showSaving = false;

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public formService: FormService) {
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.formService.getForm(+this.route.snapshot.paramMap.get('id'))
      .subscribe(form => {
        this.form = window['form'] = form;
        this.activeCrumbs = [this.form.root_category];
      });
  }

  dispatch(action) {
    console.log('dispatching...', action);
    this.showSaving = true;
    let asyncAction: Observable<any>;
    switch (action.type) {
      case MOVE_QUESTION:
        asyncAction = this.moveQuestion(action.questionID, action.categoryID); break;
      case MOVE_CATEGORY:
        asyncAction = this.moveCategory(action.categoryID, action.parentID); break;
      case SELECT_CATEGORY:
        asyncAction = this.selectCategory(action.categoryID); break;
      case ADD_QUESTION:
        this.activeModal.close();
        asyncAction = this.addQuestion(action.question, action.parentID); break;
      case ADD_CATEGORY:
        this.activeModal.close();
        asyncAction = this.addCategory(action.category, action.parentID); break;
      case DEL_QUESTION:
        asyncAction = this.deleteQuestion(action.questionID); break;
      case DEL_CATEGORY:
        asyncAction = this.deleteCategory(action.categoryID); break;
      case SHOW_ADD_QUESTION:
        this.selectCategory(action.categoryID)
          .subscribe(() => this.open(this.questionModalContent));
        break;
      default:
        console.log('unknown action');
    }
    this.stopLoader(asyncAction);
  }

  onSelectCategory(categoryID: number) {
    this.dispatch(selectCategory(categoryID));
  }

  onAddQuestion(question: AppQuestion) {
    this.dispatch(addQuestion(question, this.activeCategory.id));
  }

  onAddCategory(category: AppCategory) {
    this.dispatch(addCategory(category, this.activeCategory.id));
  }

  open(content) {
    this.activeModal = this.modalService.open(content)
  }

  rollbackForm() {
    this.treeView.setForm(this.form);
  }

  applyForm(form: AppForm) {
    this.form = form;
    this.showSaving = false;
  }


  /**
   * Form Builder Operations
   * ==================================
   */

  selectCategory(id: number): Observable<any> {
    let src = this.formService.getCategory(this.form.id, id);
    src.subscribe(
      category => this.activeCategory = category,
      this.handleError('fetch category')
    );
    return src;
  }

  addQuestion(question, categoryID) {
    let formID = this.form.id;
    let src = this.formService.addQuestion(formID, question, categoryID);
    src.subscribe(
      newForm => this.form = newForm,
      this.handleError('create question')
    );
    return src;
  }

  addCategory(category, parentID){
    let src = this.formService.addCategory(this.form.id, category, parentID);
    src.subscribe(
      newCategory => this.loadForm(),
      this.handleError('create category')
    );
    return src;
  }

  moveQuestion(questionID, categoryID) {
    let src = this.formService.moveQuestion(this.form.id, questionID, categoryID);
    src.subscribe(
      newForm => this.form = newForm,
      this.handleError('move question')
    );
    return src;
  }

  moveCategory(categoryID: number, parentID: number) {
    let src = this.formService.moveCategory(this.form.id, categoryID, parentID)
    src.subscribe(
      newForm => this.form = newForm,
      this.handleError('move category')
    );
    return src;
  }

  deleteCategory(id: number){
    let src = this.formService.deleteCategory(this.form.id, id);
    src.subscribe(
      () => this.loadForm(),
      this.handleError('delete Category')
    );
    return src;
  }

  deleteQuestion(id: number){
    let src = this.formService.deleteQuestion(this.form.id, id);
    src.subscribe(
      () => this.loadForm(),
      this.handleError('delete question')
    );
    return src;
  }

  handleError( operation ){
    return ( error ) => {
      this.showSaving = false;
      this.snackBar.open('Failed to ' + operation, 'Ok.. :(', {verticalPosition: "top"});
      this.rollbackForm();
    };
  }

  stopLoader( obs: Observable<any> ){
    if(!obs){
      this.showSaving = false;
      return;
    }
    obs.subscribe( () => this.showSaving = false );
  }
}
