import {Injectable} from '@angular/core';
import {PubRepo} from "./PubRepo";
import {Publication} from "./Publication";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {switchMap, tap} from "rxjs/operators";

@Injectable()
export class PubReposService {

  public repos = []
  public repos$: BehaviorSubject<PubRepo[]> = new BehaviorSubject<PubRepo[]>([])


  constructor(private http: HttpClient) {
    this.repos$.subscribe(repos => this.repos = repos)
  }

  createRepo(projectID: string, data: PubRepo): Observable<PubRepo> {
    const url = `${env.api}/projects/${projectID}/pub-repos`
    return this.http.post(url, data)
      .pipe(
        tap((newRepo: PubRepo) => {
          this.repos.push(newRepo)
          this.repos$.next(this.repos)
        })
      )
  }

  updateRepo(projectID, id: string, data: PubRepo) {
    const url = `${env.api}/projects/${projectID}/pub-repos/${id}`
    this.http.put(url, data).subscribe(_ => this.requestRepos(projectID))
  }

  deleteRepo(projectID, id: string) {
    const url = `${env.api}/projects/${projectID}/pub-repos/${id}`
    this.http.delete(url).subscribe(_ => {
      this.repos$.next(this.repos.filter(R => R.id !== id))
    })
  }

  requestRepos(projectID) {
    const url = `${env.api}/projects/${projectID}/pub-repos`
    this.http.get(url).subscribe((repos: PubRepo[]) =>
      this.repos$.next(repos))
  }

  addPublications(projectID: string, repoID: string, publications: Publication[]): Observable<any> {
    const url = `${env.api}/projects/${projectID}/pub-repos/${repoID}/publications`
    return this.http.post(url, { publications }).pipe(
      switchMap(_ => this.getPublications(projectID, repoID))
    )
  }

  removePublications(projectID: string, repoID: string, publicationIDs: string[]) {
    const url = `${env.api}/projects/${projectID}/pub-repos/${repoID}/publications/delete`
    return this.http.post(url, { publicationIDs })
  }

  getPublications(projectID, repoID: string): Observable<Publication[]> {
    const url = `${env.api}/projects/${projectID}/pub-repos/${repoID}/publications`
    return this.http.get<Publication[]>(url)
  }

}
