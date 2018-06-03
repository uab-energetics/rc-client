import { Injectable } from '@angular/core';
import {PubRepo} from "./PubRepo";
import {Publication} from "./Publication";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";

@Injectable()
export class PubReposService {

  constructor(private http: HttpClient) { }

  createRepo(projectID: number, data: PubRepo) {
    return this.http.post(`${env.api}/projects/${projectID}/pub-repos`, data)
  }

  updateRepo(id: string, data: PubRepo) {}

  deleteRepo(id: string) {}

  addPublications(repoID: string, publications: Publication[]) {}

  removePublications(repoID: string, publications: Publication[]) {}

}
