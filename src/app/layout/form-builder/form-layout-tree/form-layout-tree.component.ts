import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Form} from "../../../models/Form";
import {mapToTreeView} from "./tree-mapper";

@Component({
  selector: 'app-form-layout-tree',
  templateUrl: './form-layout-tree.component.html',
  styleUrls: ['./form-layout-tree.component.css']
})
export class FormLayoutTreeComponent implements AfterViewInit {

  @Input()
  set form( formInput: Form ){
    this._tree = mapToTreeView(formInput);
  }

  @Output('nodeSelected') nodeSelected = new EventEmitter<number>();
  @Output('nodeMoved') nodeMoved = new EventEmitter();

  @ViewChild('tree') treeview;

  _tree;
  _opts = {
    allowDrag: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.nodeSelected.emit(node.id);
        }
      }
    },
    allowDrop: (element, { parent, index }) => {
      return parent.data.type === 'folder';
    }
  };

  onMove($event){
    this.nodeMoved.emit({
      node: $event.node.id,
      parent: $event.to.parent.id
    });
  }

  ngAfterViewInit () {
    this.treeview.treeModel.expandAll();
  }

}
