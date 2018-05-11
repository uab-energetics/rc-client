import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtService} from './jwt.service';
import {Observable} from 'rxjs/Observable';
import {User} from './models/User';

import {environment as env} from './../../../environments/environment'
import { AuthResponse } from './models/AuthResponse';

@Injectable()
export class AuthService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  readonly user: Observable<User> = this.userSubject.asObservable();

  constructor( private http: HttpClient, private router: Router, private jwtService: JwtService ) {
    if(this.jwtService.isAuthenticated())
      this.userSubject.next(this.jwtService.user);
  }

  public login({ email, password }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${env.api}/auth/login`, { email, password })
      .do( response => this.jwtService.setSession(response.token, response.user) )      // Save the JWT
      .do( response => this.userSubject.next(response.user) )                           // Notify subscribes of change in logged-in user
      .share()
  }

  public register({ email, name, password }) {
    return this.http.post<AuthResponse>(`${env.api}/auth/register`, { email, name, password })
      .do( response => this.jwtService.setSession(response.token, response.user))
      .do( response => this.userSubject.next(response.user))
      .share()
  }

  public logout(): void {
    this.jwtService.clearSession()
    this.router.navigate(['/auth/login'])
  }

}
