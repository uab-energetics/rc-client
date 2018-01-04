import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {AppCategory} from '../../../models/AppCategory';
import {AppTreeNode} from './dataModel';
import {mapToTreeNodes} from './dataMapper';
import {ITreeNode} from 'angular-tree-component/dist/defs/api';
import {AppQuestion} from "../../../models/AppQuestion";

export interface AppMoveEvent {
  node: AppTreeNode;
  newParent: AppTreeNode;
}


/**
 * ====================================
 * TABLE OF CONTENTS:
 * ---------------------
 * 1.) Component Props
 * 2.) Output Events
 * 3.) Exposed Public Methods
 * 4.) Configurable Input Options
 * 5.) Hidden Component Stuff
 * ====================================
 */
@Component({
  selector: 'app-question-tree',
  templateUrl: './question-tree.component.html',
  styleUrls: ['./question-tree.component.css']
})
export class QuestionTreeComponent implements OnChanges {

  /**
   * ======================================
   * COMPONENT PROPS
   * ( this is the most important part )
   * ======================================
   */
  @Input() rootCategory: AppCategory;


  /**
   * ======================================
   * OUTPUT EVENTS
   * ( for your event-binding needs )
   * ======================================
   */
  @Output() nodeDoubleClicked = new EventEmitter<AppTreeNode>();
  @Output() nodeMoved = new EventEmitter<AppMoveEvent>();


  /**
   * ==================================================
   * EXPOSED PUBLIC METHODS
   * ( These might be exported by parent component )
   * ==================================================
   */
  public get activeNode(): AppTreeNode {
    if(this.active) return this.active;
    return null;
  }

  public syncWithForm() {
    this.treeNodes = mapToTreeNodes(this.rootCategory);
  }

  public lookupInForm(nodeID: number): AppQuestion | AppCategory {
    // BFS
    let start = this.rootCategory;
    let queue: AppCategory[] = [start];
    while(queue.length > 0){
      let current = queue.pop();
      if(current.id == nodeID) return current;
      for(let i = 0; i < current.questions.length; i++)
        if(nodeID === current.questions[i].id)
          return current.questions[i];
      queue.push(...current.children);
    }
    return null;
  }


  /**
   * ===========================================================
   * INPUT OPTIONS
   * ( Use these input properties to configure behavior )
   * ===========================================================
   */
  @Input() allowDrop = (node, parent) => false;
  @Input() allowDrag = false;


  /**
   * ======================
   * HIDDEN COMPONENT STUFF
   * ( you shouldn't care about this )
   * ======================
   */
  @ViewChild('tree') treeComponent;

  private treeNodes: any;
  private treeOptions: any = {
    allowDrag: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.nodeDoubleClicked.emit(node.data.withOriginalID());
        }
      }
    },
    allowDrop: (node, { parent, index }) => {
      return this.allowDrop(node.data.withOriginalID(), parent.data.withOriginalID());
    }
  };

  active: AppTreeNode;
  onActivate = ($event) => this.active = $event.node.data;

  onMove($event: MoveEvent) {
    this.nodeMoved.emit({
      node: $event.node,
      newParent: $event.to.parent
    });
  }

  onInitialized(){
    this.treeComponent.treeModel.expandAll();
  }

  ngOnChanges() {
    this.syncWithForm();
  }
}


/**
 * =============================
 * PACKAGE INTERFACE REFERENCES
 * =============================
 */

interface MoveEvent {
  node: AppTreeNode; // the node that was moved
  to: To; // can't say I like this schema. at least I have TypeScript to help out
}

interface To {
  parent: AppTreeNode; // the parent node that contains the moved node
  index: number; // the index in the parent where the node was moved
}
