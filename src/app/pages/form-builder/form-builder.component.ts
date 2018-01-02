import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AppCategory} from "../../models/AppCategory";
import {AppQuestion} from "../../models/AppQuestion";
import * as _ from 'lodash';
import {AppForm} from "../../models/AppForm";
import {
  ADD_CATEGORY, ADD_QUESTION, addCategory, addQuestion, DEL_CATEGORY, DEL_QUESTION, deleteCategory, deleteQuestion, MOVE_CATEGORY,
  MOVE_QUESTION,
  moveCategory,
  moveQuestion,
  SELECT_CATEGORY,
  selectCategory, SHOW_ADD_QUESTION
} from './actions';
import {MatSnackBar} from "@angular/material";
import {FormService} from "../../shared/services/form.service";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {FormStore} from './FormStore';
import {of} from 'rxjs/observable/of';
import {AppNodeType, AppTreeNode} from '../../shared/components/question-tree/dataModel';

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

  activeCategory: AppCategory;

  formStore: FormStore;
  form: AppForm;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public formService: FormService
  ) { }

  ngOnInit() {
    let formID = +this.route.snapshot.paramMap.get('id');
    this.formStore = new FormStore(this.formService, formID);
    this.formStore.changes.subscribe( form => {
      this.form = form;
    });
  }




  open(content) {
    this.activeModal = this.modalService.open(content)
  }


  /**
   * Form Builder Operations
   * ==================================
   */

  nodeSelected(node: AppTreeNode) {
    if(node.type !== AppNodeType.category) return;

    this.formService.getCategory(this.form.id, node.id)
      .subscribe( category => this.activeCategory = category );
  }

  onAddQuestion(question: AppQuestion) {
    this.formStore.dispatch(addQuestion(question, this.activeCategory.id));
  }

  onAddCategory(category: AppCategory) {
    this.formStore.dispatch(addCategory(category, this.activeCategory.id));
  }

  selectCategory(id: number): Observable<any> {
    // TODO - categories
    return of();
  }

  addQuestion(question, categoryID) {
    this.formStore.dispatch(addQuestion(question, categoryID));
  }

  addCategory(category, parentID){
    this.formStore.dispatch(addCategory(category, parentID));
  }

  moveQuestion(questionID, categoryID) {
    this.formStore.dispatch(moveQuestion(questionID, categoryID));
  }

  moveCategory(categoryID: number, parentID: number) {
    this.formStore.dispatch(moveCategory(categoryID, parentID));
  }

  deleteCategory(id: number){
    this.formStore.dispatch(deleteCategory(id));
  }

  deleteQuestion(id: number){
    this.formStore.dispatch(deleteQuestion(id));
  }

}
