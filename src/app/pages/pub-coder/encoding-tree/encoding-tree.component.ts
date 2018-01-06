import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {EncodingNode, EncodingNodeType} from "./dataModel";
import {mapToEncodingNode} from "./dataMapper";
import {AppExperimentEncoding} from "../../../models/AppExperimentEncoding";
import {MatMenuTrigger} from "@angular/material";


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
  selector: 'app-encoding-tree',
  templateUrl: './encoding-tree.component.html',
  styleUrls: ['./encoding-tree.component.css']
})
export class EncodingTreeComponent implements OnChanges {

  /**
   * ======================================
   * COMPONENT PROPS
   * ( this is the most important part )
   * ======================================
   */
  @Input() encoding: AppExperimentEncoding;


  /**
   * ======================================
   * OUTPUT EVENTS
   * ( for your event-binding needs )
   * ======================================
   */
  @Output() nodeDoubleClicked = new EventEmitter<EncodingNode>();
  @Output() nodeMoved = new EventEmitter();


  types = EncodingNodeType;
  sourceMap;

  /**
   * ==================================================
   * EXPOSED PUBLIC METHODS
   * ( These might be exported by parent component )
   * ==================================================
   */
  public get activeNode(): EncodingNode {
    if(this.active) return this.active;
    return null;
  }

  public syncWithForm() {
    let { nodes, sourceMap } = mapToEncodingNode(this.encoding);
    this.treeNodes = nodes;
    this.sourceMap = sourceMap;
  }

  public lookupInForm(nodeID: number) {
    alert("Lookup not implemented");
  }


  /**
   * ======================
   * HIDDEN COMPONENT STUFF
   * ( you shouldn't care about this )
   * ======================
   */
  @ViewChild('tree') treeComponent;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  private treeNodes: any;
  private treeOptions: any = {
    allowDrag: true,
    idField: '_id',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.nodeDoubleClicked.emit(node.data);
        },
        contextMenu: (tree, node, $event) => {
          $event.preventDefault();
          this.trigger.openMenu();
        }
      }
    },
    allowDrop: (node, { parent, index }) => {
      return true;
    }
  };

  active: EncodingNode;
  onActivate($event){
    this.active = $event.node.data;
  }

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


interface MoveEvent {
  node: EncodingNode; // the node that was moved
  to: To; // can't say I like this schema. at least I have TypeScript to help out
}

interface To {
  parent: EncodingNode; // the parent node that contains the moved node
  index: number; // the index in the parent where the node was moved
}
