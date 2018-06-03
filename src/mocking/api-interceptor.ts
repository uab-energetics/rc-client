import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MOCK_API} from "./endpoint-registry";
import {of} from "rxjs/observable/of";
import {tap} from "rxjs/operators";

import globtoregex from 'glob-to-regexp'
import lodash from 'lodash'

@Injectable()
export class ApiInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Cases:
    // 1. Url is not in mock => passthrough
    // 2. Mock has a handler defined => pass to handler
    // 3. Mock is an object => return object

    let endpoints = Object.entries(MOCK_API).map(([ key, val ]) => ({
      path: globtoregex(key),
      res: val as object | Function
    }))

    let path = /:\/\/[a-z.]+(\/.*)/.exec(req.url)[1]
    console.log("Intercepting Request: ", path)

    let response = data => of(new HttpResponse({ body: data })).pipe( tap( res => console.log("Replacing with: ", res) ))

    let matches = endpoints.filter( E => E.path.exec(path) )

    if(matches.length > 0) {
      let mock = matches[0]
      if(lodash.isFunction(mock.res)) {
        return response(mock.res(req))
      } else {
        return response(mock.res)
      }
    }

    return next.handle(req);
  }

}

export const mockApiProvider = { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
