import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {User} from '../auth/models/User'

let api = environment.api;

@Injectable()
export class PeopleService {

  constructor( private http: HttpClient ) { }

  search(nameOrEmail: string){
    if(nameOrEmail === ''){
      return of([]);
    }
    return this.http.get<User[]>(`${api}/users?search=${nameOrEmail}`)
  }

}
