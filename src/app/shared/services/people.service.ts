import { Injectable } from '@angular/core';
import {AppUser} from "../../models/AppUser";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

let api = environment.api;

@Injectable()
export class PeopleService {

  constructor(
    private http: HttpClient
  ) { }

  search(nameOrEmail: string){
    return this.http.get<AppUser[]>(`${api}/users?search=${nameOrEmail}`)
  }

  updateMyProfile(user: AppUser){
    return this.http.put<AppUser>(`${api}/my-profile`, user)
  }

}
