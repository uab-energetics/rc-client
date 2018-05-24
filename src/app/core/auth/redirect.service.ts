import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class RedirectService {

  constructor(private router: Router) {}

  getRedirect() {
    return {
      redirect: localStorage.getItem('redirect'),
      redirectQueryParams: JSON.parse(localStorage.getItem('redirectQueryParams'))
    }
  }

  followRedirect() {
    let {redirect, redirectQueryParams} = this.getRedirect()
    this.router.navigateByUrl(
      redirect || '/',
      redirectQueryParams || {}
    )
  }

  setRedirect(route: string, queryParams = {}) {
    localStorage.setItem('redirect', route)
    localStorage.setItem('redirectQueryParams', JSON.stringify(queryParams))
  }

  deleteRedirect(): void {
    localStorage.removeItem('redirect')
    localStorage.removeItem('redirectQueryParams')
  }

}
