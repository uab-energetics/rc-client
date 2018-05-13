import  {Injectable} from '@angular/core';
import {AppForm} from "../forms/AppForm";
import {AppProject} from "./AppProject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {AppPublication} from "../publications/AppPublication";
import {PaginatedResult} from "../pagination/PaginatedResult";
import {PaginationOptions} from "../pagination/PaginationOptions";
import {User} from '../auth/models/User'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

const api = environment.api;

@Injectable()
export class ProjectService {

  public projects$ = new BehaviorSubject<AppProject[]>([])

  constructor(
    private http: HttpClient
  ) { }

  find(projectID: number): Observable<AppProject> {
      return this.http.get<AppProject>(api + "/projects/" + projectID)
        .share();
  }

  createProject(project: AppProject): Observable<AppProject[]> {
    return this.http.post<any>(api + "/projects", project)
      .switchMap(_ => this.myProjects())
      .share()
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${api}/projects/${id}`)
      .switchMap(_ => this.myProjects())
      .share()
  }

  getDashboard(id: number): Observable<any> {
    return this.http.get(`${api}/projects/${id}/dashboard`)
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
    return this.http.get<AppProject[]>(api + '/users/projects')
      .do( projects => this.projects$.next(projects) )
      .share()
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

  inviteResearcher(projectID: number, userID: number): Observable<void> {
    return this.http.post<void>(`${api}/projects/${projectID}/researchers`, {
      user_id: userID,
      notification_payload: {
        projectID: projectID
      }
    }).share();
  }

  inviteEncoder(projectID: number, userID: number): Observable<void> {
    return this.http.post<void>(`${api}/projects/${projectID}/encoders`, {
      user_id: userID,
      notification_payload: {
        projectID: projectID
      }
    }).share();
  }

  getResearchers(projectID: number, searchTerm = null): Observable<User[]> {
    let params = {};
    if (searchTerm) params['search'] = searchTerm;
    return this.http.get<User[]>(`${api}/projects/${projectID}/researchers`, {params})
      .share()
  }

  getEncoders(projectID: number, searchTerm = null): Observable<User[]> {
    let params = {};
    if (searchTerm) params['search'] = searchTerm;
    return this.http.get<User[]>(`${api}/projects/${projectID}/encoders`, {params})
      .share()
  }

  removeResearcher(projectID: number, userID: number): Observable<any> {
    return this.http.delete(`${api}/projects/${projectID}/researchers/${userID}`)
  }

  removeEncoder(projectID: number, userID: number): Observable<any> {
    return this.http.delete(`${api}/projects/${projectID}/encoders/${userID}`)
  }

}
