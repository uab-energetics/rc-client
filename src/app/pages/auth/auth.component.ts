import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

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
