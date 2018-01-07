import {Injectable} from '@angular/core';

import jsonwebtoken from 'jsonwebtoken';
import {LoggerService} from "../logger.service";
import {AppUser} from "../../models/AppUser";
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

  private static USER_LOCATION = 'user';
  private static JWT_LOCATION = 'jwt';

  jwt: string;
  jwt_decoded: any;
  _user: AppUser;

  constructor(
    private log: LoggerService,
  ) {
    this.loadSessionData();
    this.log.write('loaded session data:', this.user, this.jwt_decoded);
  }

  get user(){
    return this._user;
  }

  loadSessionData() {
    this.jwt = localStorage.getItem( UserService.JWT_LOCATION );
    this._user = JSON.parse(localStorage.getItem( UserService.USER_LOCATION ));

    if (this.jwt && this._user) {
      this.jwt_decoded = jsonwebtoken.decode(this.jwt);
    }
  }

  public setSession(jwt: string, user: AppUser){
    localStorage.setItem(UserService.JWT_LOCATION, jwt);
    localStorage.setItem(UserService.USER_LOCATION, JSON.stringify(user));
    this.loadSessionData();
  }

  public setUser(user: AppUser) {
    this.setSession(this.jwt, user);
    console.log('user set..', user);
  }

  public clearSession() {
    localStorage.removeItem(UserService.JWT_LOCATION);
    localStorage.removeItem(UserService.USER_LOCATION);
    this.loadSessionData();
  }

  public isAuthenticated() {
    if (!this._user || !this.jwt)
      return false;
    if (this.jwt_decoded.exp < (new Date().getTime() / 1000))
      return false;
    return true;
  }

}
