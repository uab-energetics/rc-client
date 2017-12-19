import  { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {AppProject} from "../../models/AppProject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, share} from "rxjs/operators";

const api = environment.api;

@Injectable()
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  find(projectID: number): Observable<AppProject> {
    return this.http.get<AppProject>(api + "/projects/" + projectID)
      .pipe(
        share()
      )
  }

  createProject(project: AppProject): Observable<AppProject> {
    return this.http.post<AppProject>(api + "/projects", project)
      .pipe(
        share()
      )
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${api}/projects/${id}`)
      .pipe(
        share()
      )
  }

  createForm(projectID: number, form: AppForm): Promise<AppForm> {
    return this.http.post<AppForm>(`${api}/projects/${projectID}/forms`, form)
      .toPromise();
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

}
