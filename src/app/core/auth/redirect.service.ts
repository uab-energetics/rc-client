import {Injectable} from '@angular/core';

@Injectable()
export class RedirectService {

  getRedirect() {
    return {
      redirect: localStorage.getItem('redirect'),
      redirectQueryParams: JSON.parse(localStorage.getItem('redirectQueryParams'))
    }
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
