import { Injectable } from '@angular/core';
import {AppForm} from "../../../models/AppForm";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {AppCategory} from "../../../models/AppCategory";
import {AppQuestion} from "../../../models/AppQuestion";
import {share} from "rxjs/operators";

const api = environment.api;

@Injectable()
export class FormService {

  constructor(
    private http: HttpClient
  ) { }

  getForm(id: number): Observable<AppForm> {
    return this.http.get<AppForm>(`${api}/forms/${id}`)
      .pipe(share());
  }

  addQuestion(formID: number, question: AppQuestion, parentID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/questions`;
    let body = {
      'category_id': parentID,
      question
    };
    return this.http.post<AppForm>(url, body)
      .pipe(share());
  }

  addCategory(formID: number, category: AppCategory, parentID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/categories`;
    let body = Object.assign({}, category, { parent_id: parentID });
    return this.http.post<AppForm>(url, body)
      .pipe(share());
  }

  deleteQuestion(formID: number, questionID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/questions/${questionID}`;
    return this.http.delete<AppForm>(url)
      .pipe(share());
  }

  deleteCategory(formID: number, categoryID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/categories/${categoryID}`;
    return this.http.delete<AppForm>(url)
      .pipe(share());
  }

  moveQuestion(formID: number, questionID: number, categoryID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/questions/${questionID}`;
    let body = {
      'category_id': categoryID
    };
    return this.http.put<AppForm>(url, body)
      .pipe(share());
  }

  moveCategory(formID: number, categoryID: number, parentID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/categories/${categoryID}`;
    let body = {
      'parent_id': parentID
    };
    return this.http.put<AppForm>(url, body)
      .pipe(share());
  }

  getCategory(formID: number, categoryID: number): Observable<AppCategory> {
    let url = `${api}/categories/${categoryID}`;
    return this.http.get<AppCategory>(url)
      .pipe(share());

  }

  getQuestion(formID: number, id: number): Observable<AppCategory> {
    let url = `${api}/questions/${id}`;
    return this.http.get<AppCategory>(url)
      .pipe(share());
  }

}
