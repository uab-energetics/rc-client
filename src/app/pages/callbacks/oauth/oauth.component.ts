import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/auth/auth.service";
import { RedirectService } from "../../../core/auth/redirect.service";
import { ActivatedRoute, Router } from "@angular/router";

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  constructor(private as: AuthService,
    private redirectService: RedirectService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute) { }

  ngOnInit() {
    firebase.auth().getRedirectResult()
      .then(() => this.afAuth.auth.currentUser.getIdToken(true))
      .then((idToken) => {
        this.as.setToken(idToken)
        this.redirectService.followRedirect()
      })
  }

}
