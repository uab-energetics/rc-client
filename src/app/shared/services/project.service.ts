import  { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {AppProject} from "../../models/AppProject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, share} from "rxjs/operators";
import {AppPublication} from "../../models/AppPublication";
import * as _ from "lodash";

const api = environment.api;

@Injectable()
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  find(projectID: number): Observable<AppProject> {
      return this.http.get<AppProject>(api + "/projects/" + projectID)
        .share();
  }

  createProject(project: AppProject): Observable<AppProject> {
    return this.http.post<AppProject>(api + "/projects", project)
      .pipe(share())
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${api}/projects/${id}`)
      .pipe(share())
  }

  createForm(projectID: number, form: AppForm): Observable<AppForm> {
    return this.http.post<AppForm>(`${api}/projects/${projectID}/forms`, form)
      .share()
  }

  createPublication(projectID: number, publication: AppPublication): Promise<AppPublication> {
    return this.http.post<AppPublication>(`${api}/projects/${projectID}/publications`, publication)
      .toPromise();
  }

  deleteForm(id: number): Observable<any> {
    return this.http.delete(`${api}/forms/${id}`)
      .pipe(share())
  }

  myProjects(): Observable<AppProject[]> {
    return this.http.get<AppProject[]>(api + '/users/projects').pipe(
      catchError( err => [] )
    )
  }

  getForms(projectID: number): Observable<AppForm[]> {
    return this.http.get<AppForm[]>(`${api}/projects/${projectID}/forms`)
      .pipe(share())
  }

  getPublications(projectID: number): Observable<AppPublication[]> {
    return this.http.get<AppPublication[]>(`${api}/projects/${projectID}/publications`)
      .pipe(share())
  }

}
