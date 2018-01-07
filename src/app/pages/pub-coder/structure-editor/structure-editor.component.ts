import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppExperimentEncoding} from "../../../models/AppExperimentEncoding";
import {AppForm} from "../../../models/AppForm";
import {EncodingTreeComponent} from "../encoding-tree/encoding-tree.component";
import {EncodingNode, EncodingNodeType} from "../encoding-tree/dataModel";
import {AppBranch} from "../../../models/AppBranch";
import {AppQuestion} from "../../../models/AppQuestion";
import {MatSlideToggleChange} from "@angular/material";
import {BranchQuestionsService} from "../../../shared/services/branch-questions.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {NotifyService} from "../../../shared/services/notify.service";
import * as _ from "lodash";

@Component({
  selector: 'app-structure-editor',
  templateUrl: './structure-editor.component.html',
  styleUrls: ['./structure-editor.component.css']
})
export class StructureEditorComponent implements OnInit {

  @Input() encoding: AppExperimentEncoding;
  @Input() codebook: AppForm;

  @Output() branchUpdate = new EventEmitter();
  @Output() branchCreate = new EventEmitter<object>();

  @ViewChild(EncodingTreeComponent) encodingTree;

  constructor(
    private branchQuestionsService: BranchQuestionsService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.structureState = getState(this.encoding);
  }

  ngOnChanges() {
    this.structureState = getState(this.encoding);
    this.structureUpdates = null;
  }

  structureState;
  structureUpdates;

  selectedNode: EncodingNode;
  selectedBranch: AppBranch;
  selectedQuestion: AppQuestion;

  loading = 0;

  nodeSelected(node: EncodingNode){
    this.selectedNode = node;
    switch (node.type){
      case EncodingNodeType.branch:
        this.selectedBranch = this.encodingTree.sourceMap['branches'][node.id];
        break;
      case EncodingNodeType.question:
        this.selectedQuestion = this.encodingTree.sourceMap['questions'][node.id];
        break;
    }
  }

  questionChange(question, $event: MatSlideToggleChange){
    console.log(question, $event);
    let bid = this.selectedBranch.id;
    this.structureUpdates = this.structureUpdates || {};
    this.structureUpdates[bid] = this.structureUpdates[bid] || {};
    this.structureUpdates[bid][question.id] = $event.checked;
    this.structureState = reduce(this.structureState, this.structureUpdates);
  }

  view(){
    if(!this.selectedNode) return '';
    switch(this.selectedNode.type){
      case EncodingNodeType.root:
        return 'E';
      case EncodingNodeType.branch:
        return 'B';
      case EncodingNodeType.question:
        return 'Q';
      default:
        return '';
    }
  }

  commitChanges(){
    console.log("saving...", this.structureUpdates);

    let changeRequests = [];
    for(let [bid, branch] of Object.entries(this.structureUpdates)){
      for(let [qid, active] of Object.entries(branch)){
        switch (active){
          case true:
            changeRequests.push(this.branchQuestionsService.addQuestion(bid, qid)); break;
          case false:
            changeRequests.push(this.branchQuestionsService.removeQuestion(bid, qid)); break;
        }
      }
    }
    this.loading = 1;
    forkJoin(changeRequests)
      .finally(() => this.loading = 0)
      .subscribe( res => {
        this.branchUpdate.emit();
      })
  }

  createBranch(){
    let name = this.notify.prompt("Enter a name for the new branch:");
    if(!name) return;
    this.branchCreate.emit({ name });
  }

}

function getState(encoding: AppExperimentEncoding){
  if(!encoding) return;
  let state = {};
  encoding.experiment_branches.forEach( branch => {
    state[branch.id] = {};
    branch.question_map.forEach( question => {
      state[branch.id][question.id] = true;
    })
  });
  return state;
}

function reduce(state, updates){
  return _.mergeWith(state, updates);
}

interface Updates {
  [branch_id: number]: {
    [question_id: number]: boolean;
  }
}
