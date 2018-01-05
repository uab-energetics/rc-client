import  { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {AppProject} from "../../models/AppProject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, share} from "rxjs/operators";
import {AppPublication} from "../../models/AppPublication";
import * as _ from "lodash";
import {AppUser} from "../../models/AppUser";
import {PaginatedResult} from "../../models/PaginatedResult";
import {PaginationOptions} from "../../models/PaginationOptions";

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
      .share()
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${api}/projects/${id}`)
      .share()
  }

  updateProject(project: AppProject): Observable<AppProject> {
    return this.http.put<AppProject>(`${api}/projects/${project.id}`, project)
      .share()
  }

  createForm(projectID: number, form: AppForm): Observable<AppForm> {
    return this.http.post<AppForm>(`${api}/projects/${projectID}/forms`, form)
      .share()
  }

  updateForm(form: AppForm): Observable<AppForm> {
    return this.http.put<AppForm>(`${api}/forms/${form.id}`, form)
      .share()
  }

  deleteForm(id: number): Observable<any> {
    return this.http.delete(`${api}/forms/${id}`)
      .share()
  }

  createPublication(projectID: number, publication: AppPublication): Observable<AppPublication> {
    return this.http.post<AppPublication>(`${api}/projects/${projectID}/publications`, publication)
      .share();
  }

  myProjects(): Observable<AppProject[]> {
    return this.http.get<AppProject[]>(api + '/users/projects').pipe(
      catchError( err => [] )
    )
  }

  getForms(projectID: number): Observable<AppForm[]> {
    return this.http.get<AppForm[]>(`${api}/projects/${projectID}/forms`)
      .share()
  }

  getPublications(projectID: number, options: PaginationOptions = { page: 1, page_size: 20 }): Observable<PaginatedResult<AppPublication>> {
    let params: any = Object.assign({}, options);
    return this.http.get<PaginatedResult<AppPublication>>(
      `${api}/projects/${projectID}/publications`,
      { params }).share()
  }

  inviteCollaborator(projectID: number, userID: number): Observable<void> {
    return this.http.post<void>(`${api}/projects/${projectID}/invite-researcher`, {
      user_id: userID,
      notification_payload: {
        projectID: projectID
      }
    }).share();
  }

  getResearchers(projectID: number): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${api}/projects/${projectID}/researchers`)
      .share()
  }

}
