import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {AppPublication} from "./AppPublication";
import 'rxjs/add/operator/share';
import {List} from "lodash";
import {PaginatedResult} from "../pagination/PaginatedResult";
import {PaginationOptions} from "../pagination/PaginationOptions";

const api = environment.api;

@Injectable()
export class PublicationsService {

  constructor( private http: HttpClient ){}

  getPublication(id: number): Observable<AppPublication> {
    return this.http.get<AppPublication>(`${api}/publications/${id}`)
      .share();
  }

  deletePublication(id: number){
    return this.http.delete(`${api}/publications/${id}`)
      .share()
  }

  getPublications(options: PaginationOptions = { page_size: 40, page: 0 }): Observable<PaginatedResult<AppPublication>> {
    let params = Object.assign(new HttpParams(), options);

    return this.http.get<PaginatedResult<AppPublication>>(`${api}/publications`, {params}).share()
  }

  uploadFromCSV(projectID: number, data: Array<any>): Observable<any> {
    return this.http.post(`${api}/projects/${projectID}/publications/csv`, {
      data: data
    }).share();
  }

}
