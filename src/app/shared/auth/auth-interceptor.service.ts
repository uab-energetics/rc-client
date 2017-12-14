import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService {

  constructor( private userService: UserService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userService.isLoggedIn()) {
      const jwt = this.userService.jwt;
      const authenticatedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + jwt)});
      return next.handle(authenticatedRequest);
    }
    return next.handle(req);
  }

}
