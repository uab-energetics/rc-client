import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AppNodeType, AppTreeNode} from "../../../shared/components/question-tree/dataModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppQuestion} from "../../../models/AppQuestion";
import {AppCategory} from "../../../models/AppCategory";
import {AppForm} from "../../../models/AppForm";
import {AppMoveEvent} from "../../../shared/components/question-tree/question-tree.component";

@Component({
  selector: 'app-codebook-tree',
  templateUrl: './codebook-tree.component.html',
  styleUrls: ['./codebook-tree.component.css']
})
export class CodeBookTreeComponent {


  /**
   * =================
   * COMPONENT PROPS
   * =================
   */
  @Input() form: AppForm;


  /**
   * ================================
   * OUTPUT EVENTS
   * ================================
   */
  @Output() createQuestion  = new EventEmitter();
  @Output() createCategory  = new EventEmitter();
  @Output() moveQuestion    = new EventEmitter();
  @Output() moveCategory    = new EventEmitter();
  @Output() deleteQuestion  = new EventEmitter();
  @Output() deleteCategory  = new EventEmitter();
  @Output() editQuestion    = new EventEmitter();
  @Output() editCategory    = new EventEmitter();
  @Output() categorySelected = new EventEmitter<number>();


  /**
   * =================================================
   * EVENT HANDLERS
   * ( These interpret the child components events
   * and emits the appropriate events in the context
   * of the codebook builder )
   * =================================================
   */
  treeDelete(node: AppTreeNode){
    switch(node.type){
      case AppNodeType.category:
        return this.deleteCategory.emit({ id: node.id });

      case AppNodeType.question:
        return this.deleteQuestion.emit({ id: node.id });
    }
  }

  treeEdit(node: AppTreeNode){
    switch(node.type){
      case AppNodeType.category:
        alert("TODO - edit categories");
        return;

      case AppNodeType.question:
        this.activeFormQuestion = this.questionTree.lookupInForm(this.activeNode.id);
        return this.modal = this.ms.open(this.questionModalContent);
    }
  }

  treeCreate(parentNode: AppTreeNode, type) {
    this.activeFormQuestion = null;
    this.activeFormCategory = null;
    switch(type){
      case 'question':
        return this.modal = this.ms.open(this.questionModalContent);
      case 'category':
        return this.modal = this.ms.open(this.categoryModalContent);
    }
  }

  saveQuestion(data: AppQuestion){
    this.modal.close();
    if(data.id){
      return this.editQuestion.emit({
        id: data.id,
        categoryID: this.activeNode.id,
        data
      })
    }

    this.createQuestion.emit({
      categoryID: this.activeNode.id,
      data
    });
  }

  saveCategory(data: AppCategory){
    this.modal.close();
    if(data.id){
      return this.editCategory.emit({
        id: data.id,
        data
      })
    }

    this.createCategory.emit({
      parentID: this.activeNode.id,
      data
    });
  }

  treeMove($event: AppMoveEvent) {
    let node = $event.node;
    let newParent = $event.newParent;

    switch(node.type){

      case AppNodeType.question:
        return this.moveQuestion.emit({ id: node.id, categoryID: newParent.id });

      case AppNodeType.category:
        return this.moveCategory.emit({ id: node.id, newParentID: newParent.id });
    }
  }

  treeNodeDoubleClicked(node: AppTreeNode){
    if(node.type === AppNodeType.category)
      this.categorySelected.emit(node.id);
  }



  private get activeNode(){
    return this.questionTree.activeNode;
  }


  /**
   * ================================
   * HIDDEN COMPONENT STUFF
   * ================================
   */
  @ViewChild('questionTree') questionTree;
  @ViewChild('questionModalContent') questionModalContent;
  @ViewChild('categoryModalContent') categoryModalContent;

  modal;
  activeFormQuestion;
  activeFormCategory;
  syncWithForm = () => this.questionTree.syncWithForm();
  allowDrop = (node, newParent) => newParent.type === AppNodeType.category;
  open = (content) => this.modal = this.ms.open(content);

  constructor(public ms: NgbModal) {}
}
