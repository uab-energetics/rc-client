import {Injectable, OnInit} from '@angular/core';

import jsonwebtoken from 'jsonwebtoken';
import User from './User';

@Injectable()
export class UserService implements OnInit {

  private static USER_LOCATION = 'user';
  private static JWT_LOCATION = 'jwt';

  jwt: string;
  jwt_decoded: any;
  _user: User;

  constructor() {
    this.loadSessionData();
  }

  get user(){
    console.log('"Tried to access user data while not logged in"');
    return this._user;
  }

  loadSessionData() {
    this.jwt = localStorage.getItem( UserService.JWT_LOCATION );
    this._user = JSON.parse(localStorage.getItem( UserService.USER_LOCATION ));

    if (this.jwt && this._user) {
      this.jwt_decoded = jsonwebtoken.decode(this.jwt);
    }
  }

  public setSession(jwt: string, user: User){
    localStorage.setItem(UserService.JWT_LOCATION, jwt);
    localStorage.setItem(UserService.USER_LOCATION, JSON.stringify(user));
    this.loadSessionData();
  }

  public clearSession() {
    localStorage.removeItem(UserService.JWT_LOCATION);
    localStorage.removeItem(UserService.USER_LOCATION);
    this.loadSessionData();
  }

  public isLoggedIn() {
    if (!this._user || !this.jwt)
      return false;
    if (this.jwt_decoded.exp < (new Date().getTime() / 1000))
      return false;
    return true;
  }

  ngOnInit(): void {
    this.loadSessionData();
  }
}
