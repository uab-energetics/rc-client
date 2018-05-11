import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";
import {ConflictsResponse} from '../../pages/main/conflicts/definitions'

const api = environment.api;

@Injectable()
export class ConflictsService {

  constructor(
    private http: HttpClient
  ) { }

  getConflictsReport(encoding_id: number): Observable<ConflictsResponse> {
    return this.http.get<ConflictsResponse>(`${api}/conflict-report/${encoding_id}`)
      .share();
  }
}
