import { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserService} from "../auth/user.service";

const api = environment.api;

@Injectable()
export class EncodingService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getEncoding(id: number): Observable<AppExperimentEncoding> {
    return this.http.get<AppExperimentEncoding>(`${api}/encodings/${id}`)
      .share();
  }

  public calculateCompletion(form: AppForm, encoding): number {
    return Math.ceil(Math.random() * 100);
  }

  myEncodings(): Observable<AppExperimentEncoding[]> {
    return this.http.get<AppExperimentEncoding[]>(`${api}/users/encodings`)
      .share()
  }

  selfAssign(form_id: number, publication_id: number): Observable<AppExperimentEncoding[]> {
    return this.http.post<AppExperimentEncoding[]>(`${api}/assignments/manual`, {
      form_id,
      publication_id,
      user_id: this.userService.user.id
    }).share()
  }

  quitEncoding(encoding_id: number): Observable<void> {
    return this.http.delete<void>(`${api}/encodings/${encoding_id}`)
      .share();
  }

}
