import {Injectable} from '@angular/core';
import {PubRepo} from "./PubRepo";
import {Publication} from "./Publication";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class PubReposService {

  public repos = []
  public repos$: BehaviorSubject<PubRepo[]> = new BehaviorSubject<PubRepo[]>([])


  constructor(private http: HttpClient) {
    this.repos$.subscribe(repos => this.repos = repos)
  }

  createRepo(projectID: number, data: PubRepo) {
    const url = `${env.api}/projects/${projectID}/pub-repos`
    return this.http.post(url, data).subscribe((newRepo: PubRepo) => {
      this.repos.push(newRepo)
      this.repos$.next(this.repos)
    })
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

  addPublications(repoID: string, publications: Publication[]) {
  }

  removePublications(repoID: string, publications: Publication[]) {
  }

}
