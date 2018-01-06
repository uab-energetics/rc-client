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
import {Router} from '@angular/router';
import {
  ConflictReport, ConflictsResponse, HashedBranch, HashedEncoding,
  HashedEncodings
} from "./definitions";


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

  // FORM MODEL
  form: AppForm;
  branchGroups: string[];
  questions: AppQuestion[];
  myEncoding: AppExperimentEncoding;
  otherEncodings: AppExperimentEncoding[];

  // DATA MODEL
  me: AppUser;
  conflictReport: ConflictReport;
  myEncodingData: HashedEncoding;
  otherEncodingsData: HashedEncodings;

  // COMPONENT PROPS
  loading = 0;
  ready = false;
  channel_name = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private conflictsService: ConflictsService,
    private encodingService: EncodingService,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.me = this.userService.user;

    this.loading++;
    this.conflictsService.getConflictsReport(id)
      .finally(() => this.loading--)
      .subscribe( (data: ConflictsResponse) => {

        // SETTING UP FORM MODEL
        this.form = data.encoding.form;
        this.questions = data.questions;
        this.branchGroups = data.groups;
        this.myEncoding = data.encoding;
        this.otherEncodings = data.other_encodings;

        // SETTING UP DATA MODEL
        this.conflictReport = data.conflicts;
        this.myEncodingData = hashEncoding(data.encoding);
        this.otherEncodingsData = hashEncodings(data.other_encodings);

        // COMPONENT PROPS
        // chat system
        this.channel_name = data.encoding.channel_name;
        this.ready = true;

        // BUILD THE BRANCH GROUPS OBJECT
        let set = new Set();
        this.myEncoding.experiment_branches.forEach( b => set.add(b.name) );
        this.otherEncodings.forEach( e => e.experiment_branches.forEach( b => set.add(b.name)));
        this.branchGroups = Array.from(set);

        console.log(
          this.branchGroups,
          this.myEncodingData,
          this.otherEncodingsData,
          this.conflictReport
        )
      });
  }

  /**
   * ========================
   * CALLED FROM TEMPLATE
   * ========================
   */

  conflict(branchName, encoding, question: AppQuestion): Conflict {
    if(!encoding) return { agrees: true };
    return _.get(
      this.conflictReport,
      `${branchName}.${question.id}.${encoding.id}`,
      { agrees: true }
    );
  }

  lookupResponse(branchName: string, encoding: AppExperimentEncoding, question: AppQuestion){
    if(!encoding.experiment_branches[branchName])
      return "DOESNT_HAVE_BRANCH";
    let response_path = `experiment_branches['${branchName}']['responses']['${question.id}']`;
    return _.get(
      encoding,
      response_path,
      "NO_RESPONSE"
    );
  }

  renderResponse(branchName: string, encoding: AppExperimentEncoding, question: AppQuestion){
    return renderToString(this.lookupResponse(branchName, encoding, question));
  }

  /**
   * ========================
   * CHANGE DETECTION
   * ========================
   */

  // response data changes ------------------------------------

  changes = null;
  handleResponseChange($event: QuestionUpdate){
    this.changes = reduceResponses(this.changes, $event.key, $event.response);
  }

  changeName(branchGroup: string){
    let newName = this.notify.prompt('Enter a new name:', branchGroup);
    if(!newName || newName === branchGroup ) return;
    let update = { name: newName };
    let original = this.myEncodingData.experiment_branches[branchGroup];
    if(!original) return;
    update = Object.assign(update, { id: original.id });
    this.encodingService.recordBranch(this.myEncoding.id, update as AppBranch)
      .subscribe(() => this.ngOnInit());
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





/*
* ============================
* HASHING FUNCTIONS
* ============================
* */

const hashEncodings = (encodings: AppExperimentEncoding[]): HashedEncodings =>{
  let hashed = {};
  encodings.forEach( encoding => {
    hashed[encoding.id] = hashEncoding(encoding);
  });
  return hashed;
};

const hashEncoding = (encoding: AppExperimentEncoding): HashedEncoding => {
  let hashed: any = Object.assign({}, encoding, { experiment_branches: {} });
  encoding.experiment_branches.forEach( branch => {
    hashed.experiment_branches[branch.name] = hashBranch(branch) as any;
  });
  return hashed;
};

const hashBranch = (branch: AppBranch): HashedBranch => {
  let hashed: any = Object.assign({}, branch, { responses: {} });
  branch.responses.forEach( res => {
    hashed.responses[res.question_id] = res;
  });
  return hashed;
};


/* IMPLEMENTATION NOTES */

/* There were a couple of 'gotcha' moments during implementation */
// + the branch key used during hashing must be the _name_ of the branch, not the branch's ID
// + the response key is the _question key_, not the response's ID
