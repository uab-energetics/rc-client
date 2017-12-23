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


  loading = 0;
  ready = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private conflictsService: ConflictsService
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.loading++;
    this.conflictsService.getConflictsReport(id)
      .finally(() => this.loading--)
      .subscribe( data => {
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

    this.user = this.userService.user;
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

  private conflict(encoding, question: AppQuestion): Conflict {
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

}

function hashBranch(branch: AppBranch){
  let hashedBranch = {};
  branch.responses.forEach(response => {
    hashedBranch[response.question_id] = response;
  });
  return hashedBranch;
}
