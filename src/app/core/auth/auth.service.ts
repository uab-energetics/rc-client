import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';

@Injectable()
export class AuthService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  readonly user: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private jwtService: JwtService) {
    if (this.jwtService.isAuthenticated()) {
      this.userSubject.next(this.jwtService.user)
    }
  }

  public setToken(jwt) {
    let { user_id, name, email, picture } = JwtService.decode(jwt)
    let user = { id: user_id, name, email, image: picture }
    this.jwtService.setSession(jwt, user)
    this.userSubject.next(user)
  }

  public logout(): void {
    this.jwtService.clearSession()
    this.router.navigateByUrl('/auth')
  }

}
