import  { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {AppProject} from "../../models/AppProject";
import {Observable} from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs/observable/of";
import {catchError} from "rxjs/operators";

const api = environment.api;

function handleError<T>(operation, result?: T){
  return (error: any): Observable<T> => {
    console.error('operation failed: ' + operation, error);
    return of(result as T);
  }
}

@Injectable()
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  find(projectID: number): Observable<AppProject> {
    return this.http.get<AppProject>(api + "/projects/" + projectID);
  }

  createProject(project: AppProject): Observable<AppProject> {
    return this.http.post<AppProject>(api + "/projects", project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${api}/projects/${id}`)
      .pipe(
        catchError( handleError('delete project', false))
      )
  }

  createForm(projectID: number, form: AppForm): Promise<AppForm> {
    return this.http.post(`${api}/projects/${projectID}/forms`, form).toPromise() as Promise<AppForm>;
  }

  myProjects(): Observable<AppProject[]> {
    return this.http.get<AppProject[]>(api + '/users/projects').pipe(
      catchError( handleError('my projects', []))
    )
  }

  /* TODO -- the rest of these */

  getForms(projectID: number): Observable<AppForm[]> {
    return this.http.get<AppForm[]>(`${api}/projects/${projectID}/forms`);
  }

}


let mockProjects: AppProject[] = [
  {
    id: 1,
    name: "Murine Rigor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
  },
  {
    id: 2,
    name: "Missile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
  }
];
