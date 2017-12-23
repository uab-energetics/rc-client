import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConflictsService} from "../../shared/services/conflicts.service";
import {renderToString} from "../../shared/responses/converters";
import {AppUser} from "../../models/AppUser";
import {UserService} from "../../shared/auth/user.service";

const NO_RESPONSE = 'NO_REPSONSE';

@Component({
  selector: 'app-conflicts',
  templateUrl: './conflicts.component.html',
  styleUrls: ['./conflicts.component.css']
})
export class ConflictsComponent implements OnInit {

  questions;
  otherEncodings;
  otherUsers;
  myEncoding;

  user: AppUser;
  loading = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private conflictsService: ConflictsService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    let id = +this.route.snapshot.paramMap.get('id');
    this.loading++;
    this.conflictsService.getConflictsReport(id)
      .finally(() => this.loading--)
      .subscribe( data => {
        this.questions = data.questions;
        this.otherEncodings = data.other_encodings;
        this.myEncoding = data.encoding;
        this.otherUsers = data.other_users;
      } );
  }

  renderResponse(encoding, question){
    let firstBranch = Object.keys(encoding.branches)[0];
    if(!encoding.branches[firstBranch]) return NO_RESPONSE;
    let response = encoding.branches[firstBranch][question.id];
    if(!response) return NO_RESPONSE;
    return renderToString(response);
  }

  getUser(encoding): AppUser {
    return this.otherUsers[encoding['owner_id']];
  }

}
