import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/auth/auth.service";
import { RedirectService } from "../../../core/auth/redirect.service";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private redirectService: RedirectService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    firebase.auth().getRedirectResult()
      .then(() => this.afAuth.auth.currentUser.getIdToken(true))
      .then((idToken) => {
        this.authService.setToken(idToken)
        this.redirectService.followRedirect()
      })
  }
}
