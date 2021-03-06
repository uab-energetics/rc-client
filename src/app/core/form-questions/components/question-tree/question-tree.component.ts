import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {AppCategory} from '../../../form-categories/AppCategory';
import {AppNodeType, AppTreeNode} from './dataModel';
import {mapToTreeNodes} from './dataMapper';
import {ITreeNode} from 'angular-tree-component/dist/defs/api';
import {AppQuestion} from "../../AppQuestion";

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

  sourceMap;
  public syncWithForm() {
    let {nodes, sourceMap} = mapToTreeNodes(this.rootCategory);
    this.treeNodes = nodes;
    this.sourceMap = sourceMap;
  }

  /**
   * ===========================================================
   * INPUT OPTIONS
   * ( Use these input properties to configure behavior )
   * ===========================================================
   */
  @Input() allowDrag = true;


  /**
   * ======================
   * HIDDEN COMPONENT STUFF
   * ( you shouldn't care about this )
   * ======================
   */
  @ViewChild('tree') treeComponent;

  treeNodes: any;
  treeOptions: any = {
    allowDrag: this.allowDrag,
    idField: '_id',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.nodeDoubleClicked.emit(node.data);
        }
      }
    },
    allowDrop: (node, { parent, index }) => {
      return parent.data.type === AppNodeType.category;
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
