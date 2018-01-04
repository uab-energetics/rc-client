import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {AppPublication} from "../../models/AppPublication";
import 'rxjs/add/operator/share';
import {List} from "lodash";

const api = environment.api;

@Injectable()
export class PublicationsService {

  constructor(
    private http: HttpClient
  ){}

  getPublication(id: number): Observable<AppPublication> {
    return this.http.get<AppPublication>(`${api}/publications/${id}`)
      .share();
  }

  deletePublication(id: number){
    return this.http.delete(`${api}/publications/${id}`)
      .share()
  }

  searchPublications(query: string = null): Observable<AppPublication[]> {
    let params = {};
    if(query) params['search'] = query;
    return this.http.get<AppPublication[]>(`${api}/publications`, {params})
      .share()
  }

  uploadFromCSV(projectID: number, data: Array<any>): Observable<any> {
    return this.http.post(`${api}/projects/${projectID}/publications/csv`, {
      data: data
    }).share();
  }

}
