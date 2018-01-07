import { Injectable } from '@angular/core';
import {AppUser} from "../../models/AppUser";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {AuthService} from '../auth/auth.service';

let api = environment.api;

@Injectable()
export class PeopleService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  search(nameOrEmail: string){
    if(nameOrEmail === ''){
      return of([]);
    }
    return this.http.get<AppUser[]>(`${api}/users?search=${nameOrEmail}`)
  }

}
