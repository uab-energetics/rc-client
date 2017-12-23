import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

const api = environment.api;

@Injectable()
export class ConflictsService {

  constructor(
    private http: HttpClient
  ) { }

  getConflictsReport(encoding_id: number): Observable<any> {
    return this.http.get(`${api}/conflict-report/${encoding_id}`)
      .share();
  }
}
