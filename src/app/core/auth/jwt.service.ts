import {Injectable} from '@angular/core';

import * as jsonwebtoken from 'jsonwebtoken';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JwtService {

  public user: any;
  public jwt: string;
  public jwtDecoded: any;

  constructor() {
    this.loadSessionData();
  }

  public setSession(jwt: string, user){
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    this.loadSessionData();
  }

  public clearSession() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.loadSessionData();
  }

  public static getUserFromToken(tkn) {
    let decoded = jsonwebtoken.decode(tkn)
    if(decoded) return tkn.user
    return null
  }

  public isAuthenticated() {
    if (!this.jwt || !this.jwtDecoded)
      return false;
    if (this.jwtDecoded.exp < (new Date().getTime() / 1000))
      return false;
    return true;
  }

  private loadSessionData() {
    this.jwt = localStorage.getItem('jwt');
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.jwt)
      this.jwtDecoded = jsonwebtoken.decode(this.jwt);
  }

}
