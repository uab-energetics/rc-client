import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { RedirectService } from '../../core/auth/redirect.service';
import { NotifyService } from '../../core/notifications/notify.service';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  login(provider: string) {
    let P = null;
    if (provider === 'github') P = new firebase.auth.GithubAuthProvider()
    if (provider === 'facebook') P = new firebase.auth.FacebookAuthProvider()
    return this.afAuth.auth.signInWithPopup(P)
      .then(() => this.afAuth.auth.currentUser.getIdToken(true))
      .then((idToken) => console.log(idToken))
  }

  ngOnInit() {
    document.body.classList.add('page-login-v3', 'layout-full')
    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: window.location.origin + '/callbacks/oauth',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-outlet', uiConfig);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full')
  }

}
