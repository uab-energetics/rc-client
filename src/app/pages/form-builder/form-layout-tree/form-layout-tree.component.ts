import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AppForm} from "../../../models/AppForm";
import {decodeID, mapToTreeView} from "./tree-mapper";
import {
  deleteCategory, deleteQuestion, moveCategory, moveQuestion, selectCategory,
  showAddQuestionForm
} from "../actions";

@Component({
  selector: 'app-form-layout-tree',
  templateUrl: './form-layout-tree.component.html',
  styleUrls: ['./form-layout-tree.component.css']
})
export class FormLayoutTreeComponent {

  @Input()
  set form(form: AppForm){
    this.setForm(form);
  };

  @Output() formAction = new EventEmitter();

  @ViewChild('tree') treeview;

  treeData;
  treeOptions = {
    allowDrag: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if(node.data.type !== 'folder') return;
          this.formAction.emit(
            selectCategory(
              decodeID(node.id)));
        }
      }
    },
    allowDrop: (element, { parent, index }) => {
      return parent.data.type === 'folder';
    }
  };

  onMove($event){
    console.log('move:', $event);
    let nodeID = $event.node.id;
    let tgtID = $event.to.parent.id;
    switch ($event.node.type){
      case "file":
        this.formAction.emit(moveQuestion(decodeID(nodeID), decodeID(tgtID)));
        break;
      case "folder":
        this.formAction.emit(moveCategory(decodeID(nodeID), decodeID(tgtID)));
        break;
    }
  }

  onDelete(){
    let node = this.activeNode();
    switch(node.data.type){
      case 'file':
        this.formAction.emit(deleteQuestion(decodeID(node.id)));
        break;
      case 'folder':
        this.formAction.emit(deleteCategory(decodeID(node.id)));
        break;
    }
  }

  onCreateQuestion(){
    let node = this.activeNode();
    if(node.data.type !== 'folder') return;
    this.formAction.emit(showAddQuestionForm(decodeID(node.id)));
  }

  isOnFolder() {
    let node = this.activeNode();
    if(!node) return false;
    return node.data.type === 'folder';
  }

  isOnRoot() {
    let node = this.activeNode();
    if(!node) return false;
    return node.data.isRoot;
  }

  onInitialized(){
    this.treeview.treeModel.expandAll();
  }

  public setForm(form: AppForm){
    this.treeData = [];
    this.treeData = mapToTreeView(form);
    setTimeout(() => this.treeview.treeModel.expandAll(), 2000);
  }

  private activeNode(){
    return this.treeview.treeModel.getActiveNode();
  }

}
