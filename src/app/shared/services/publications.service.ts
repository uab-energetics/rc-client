import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {share} from "rxjs/operators";

const api = environment.api;

@Injectable()
export class PublicationsService {

  constructor(
    private http: HttpClient
  ){}

  deletePublication(id: number){
    return this.http.delete(`${api}/publications/${id}`)
      .pipe(share())
  }

}
