import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {JwtService} from './jwt.service';
import {RedirectService} from './redirect.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private redir: RedirectService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.jwtService.isAuthenticated()) return true

    switch (this.jwtService.opCode) {
      case 'EXPIRED':
        console.info("JWT is expired. Returning to login screen")
        break
      case 'NOT_SET':
        console.error("JWT is not set. Returning to login screen")
        break
    }

    this.redir.setRedirect(state.url);
    this.router.navigateByUrl('/auth/login')
    return false
  }
}
