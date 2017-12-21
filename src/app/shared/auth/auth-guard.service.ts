import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.userService.isAuthenticated()) return true;

    console.log('not authenticated');

    this.authService.redirectURL = state.url;

    this.router.navigate(['/auth/login']);
    return false;
  }
}
