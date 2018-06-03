import { Injectable } from '@angular/core';
import {PubRepo} from "./PubRepo";
import {Publication} from "./Publication";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PubReposService {

  constructor(private http: HttpClient) { }

  createRepo(data: PubRepo) {}

  updateRepo(id: string, data: PubRepo) {}

  deleteRepo(id: string) {}

  addPublications(repoID: string, publications: Publication[]) {}

  removePublications(repoID: string, publications: Publication[]) {}

}
