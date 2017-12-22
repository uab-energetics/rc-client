import { Injectable } from '@angular/core';
import {AppForm} from "../../../models/AppForm";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {AppCategory} from "../../../models/AppCategory";
import {AppQuestion} from "../../../models/AppQuestion";
import 'rxjs/add/operator/share';

const api = environment.api;

@Injectable()
export class FormService {

  constructor(
    private http: HttpClient
  ) { }

  getForm(id: number): Observable<AppForm> {
    return this.http.get<AppForm>(`${api}/forms/${id}`)
      .share()
  }

  searchForms(query: string = null): Observable<AppForm[]> {
    let params = {};
    if(query) params['search'] = query;
    return this.http.get<AppForm[]>(`${api}/forms`, { params })
      .share()
  }

  addQuestion(formID: number, question: AppQuestion, parentID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/questions`;
    let body = {
      'category_id': parentID,
      question
    };
    return this.http.post<AppForm>(url, body)
      .share()
  }

  addCategory(formID: number, category: AppCategory, parentID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/categories`;
    let body = Object.assign({}, category, { parent_id: parentID });
    return this.http.post<AppForm>(url, body)
      .share()
  }

  deleteQuestion(formID: number, questionID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/questions/${questionID}`;
    return this.http.delete<AppForm>(url)
      .share()
  }

  deleteCategory(formID: number, categoryID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/categories/${categoryID}`;
    return this.http.delete<AppForm>(url)
      .share()
  }

  moveQuestion(formID: number, questionID: number, categoryID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/questions/${questionID}`;
    let body = {
      'category_id': categoryID
    };
    return this.http.put<AppForm>(url, body)
      .share()
  }

  moveCategory(formID: number, categoryID: number, parentID: number): Observable<AppForm> {
    let url = `${api}/forms/${formID}/categories/${categoryID}`;
    let body = {
      'parent_id': parentID
    };
    return this.http.put<AppForm>(url, body)
      .share()
  }

  getCategory(formID: number, categoryID: number): Observable<AppCategory> {
    let url = `${api}/categories/${categoryID}`;
    return this.http.get<AppCategory>(url)
      .share()

  }

  getQuestion(formID: number, id: number): Observable<AppCategory> {
    let url = `${api}/questions/${id}`;
    return this.http.get<AppCategory>(url)
      .share()
  }

}
