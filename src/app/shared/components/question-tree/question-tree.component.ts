import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppCategory} from '../../../models/AppCategory';
import {AppTreeNode} from './dataModel';
import {mapToTreeNodes} from './dataMapper';
import {ITreeNode} from 'angular-tree-component/dist/defs/api';


@Component({
  selector: 'app-question-tree',
  templateUrl: './question-tree.component.html',
  styleUrls: ['./question-tree.component.css']
})
export class QuestionTreeComponent implements OnInit {

  /* API */
  @Output() nodeSelected = new EventEmitter<AppTreeNode>();
  @Input() rootCategory: AppCategory;
  activeNode = (): AppTreeNode => this.treeComponent.treeModel.getActiveNode().data;

  ngOnInit() {
    this.treeNodes = mapToTreeNodes(this.rootCategory);
  }


  /* Component */
  @ViewChild('tree') treeComponent;
  private treeNodes: any;
  private treeOptions: any = {
    allowDrag: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.nodeSelected.emit(node);
        }
      }
    },
    allowDrop: (element, { parent, index }) => {
      console.log( "authorizing drop...", element, parent, index);
      return true;
    }
  };

  /* Event Handlers */
  onMove($event: MoveEvent) {
    console.log('node moved..', $event);
  }

  onInitialized(){
    this.treeComponent.treeModel.expandAll();
  }
}


interface MoveEvent {
  node: ITreeNode; // the node that was moved
  to: To; // can't say I like this schema. at least I have TypeScript to help out
}

interface To {
  parent: ITreeNode; // the parent node that contains the moved node
  index: number; // the index in the parent where the node was moved
}
