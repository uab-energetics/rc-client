import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form} from "../../../models/Form";
import {mapToTreeView} from "./tree-mapper";
import {IActionMapping} from "angular-tree-component";

@Component({
  selector: 'app-form-layout-tree',
  templateUrl: './form-layout-tree.component.html',
  styleUrls: ['./form-layout-tree.component.css']
})
export class FormLayoutTreeComponent implements OnInit {

  @Input()
  set form( formInput: Form ){
    this._tree = mapToTreeView(formInput);
  }

  @Output('nodeSelected') nodeSelected = new EventEmitter<number>();

  _tree;
  _opts = {
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.nodeSelected.emit(node.id);
        }
      }
    }
  };

  ngOnInit () {

  }

}
