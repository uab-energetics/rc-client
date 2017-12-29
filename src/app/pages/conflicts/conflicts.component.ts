import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConflictsService} from "../../shared/services/conflicts.service";
import {renderToString} from "../../shared/responses/converters";
import {AppUser} from "../../models/AppUser";
import {UserService} from "../../shared/auth/user.service";
import * as _ from 'lodash';
import {AppQuestion} from "../../models/AppQuestion";
import {AppBranch} from "../../models/AppBranch";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {QuestionUpdate} from "../../shared/components/app-form/question/question.component";
import {reduceResponses} from "../pub-coder/experiment-form/encodingReduce";
import {EncodingService} from "../../shared/services/encoding.service";
import {NotifyService} from "../../shared/services/notify.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {AppForm} from "../../models/AppForm";

/**
 * ===============================================================
 * DATA FORMATS REFERENCE
 * ===============================================================
 *
 * Encoding ---------------------
 *  {
 *    id: number,
 *    owner: AppUser,
 *    branches: {
 *      [branch_id]: {
 *        [question_id]: response: AppResponse
 *      }
 *    }
 *  }
 *
 * Conflicts --------------------
 *  {
 *    [question_id]: {
 *      [other_encoding_id]: Conflict
 *    }
 *  }
 *
 */

interface Conflict {
  agrees: boolean;
  message?: string;
}

@Component({
  selector: 'app-conflicts',
  templateUrl: './conflicts.component.html',
  styleUrls: ['./conflicts.component.css']
})
export class ConflictsComponent implements OnInit {

  questions = [];

  otherUsers = [];
  otherEncodings = [];

  conflictReport = {};

  user: AppUser;
  myEncoding: any;


  form: AppForm;

  loading = 0;
  ready = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private conflictsService: ConflictsService,
    private encodingService: EncodingService,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.questions = [];
    this.otherUsers = [];
    this.otherEncodings = [];
    this.conflictReport = {};
    this.myEncoding = {};
    this.user = this.userService.user;

    let id = +this.route.snapshot.paramMap.get('id');
    this.loading++;
    this.conflictsService.getConflictsReport(id)
      .finally(() => this.loading--)
      .subscribe( data => {
        this.form = data.encoding.form;
        this.setupTable(
          data.encoding,
          data.other_encodings,
          data.questions,
          data.conflicts
        );
        this.ready = true;
      });
  }

  setupTable(myEncoding: AppExperimentEncoding, otherEncodings: AppExperimentEncoding[], questions: AppQuestion[], conflicts){

    this.questions = questions;

    /* hash my encoding for instant lookup */
    myEncoding.experiment_branches =
      myEncoding.experiment_branches.map( branch =>
        hashBranch(branch)) as any;
    this.myEncoding = myEncoding;

    /* hash other encodings for instant lookup */
    otherEncodings.forEach( otherEncoding => {
      this.otherUsers.push(otherEncoding.owner);
      otherEncoding.experiment_branches =
        otherEncoding.experiment_branches.map(branch =>
          hashBranch(branch) as any)
    });
    this.otherEncodings = otherEncodings;

    this.conflictReport = conflicts;
  }


  /**
   * ========================
   * CALLED FROM TEMPLATE
   * ========================
   */

  conflict(encoding, question: AppQuestion): Conflict {
    return _.get(
      this.conflictReport,
      `${question.id}.${encoding.id}`,
      { agrees: true }
    );
  }

  lookupResponse(encoding, question){
    if(encoding.experiment_branches.length === 0) return null;
    let hashedBranch = encoding.experiment_branches[0];    // only using the first branch
    let response = hashedBranch[question.id];
    if(!response) return null;
    return response;
  }

  renderResponse(encoding, question){
    return renderToString(this.lookupResponse(encoding, question));
  }


  /**
   * ========================
   * CHANGE DETECTION
   * ========================
   */

  changes = null;
  handleResponseChange($event: QuestionUpdate){
    this.changes = reduceResponses(this.changes, $event.key, $event.response);
  }

  commitChanges(){
    this.loading++;
    let branch_id = this.myEncoding.experiment_branches[0].id; // because conflicts only work with the first branch right now.
    let sources = [];
    for(let [key, val] of Object.entries(this.changes)){
      val['question_id'] = key;
      let src = this.encodingService.recordResponse(this.myEncoding.id, branch_id, val);
      sources.push(src);
    }
    forkJoin(sources)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Changes Saved!');
        this.changes = null;
        this.ngOnInit();
      })
  }

}

function hashBranch(branch: AppBranch){
  let hashedBranch = Object.assign({}, branch);
  branch.responses.forEach(response => {
    hashedBranch[response.question_id] = response;
  });
  return hashedBranch;
}
