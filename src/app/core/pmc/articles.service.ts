import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {PMCResult} from "./PMCResult";

@Injectable()
export class ArticlesService {

  static API = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
  static PARAMS = {
    db: 'pmc',
    tool: 'Research_Coder',
    email: 'chris.rocco7@gmail.com',
    retmode: 'json'
  }

  constructor(private http: HttpClient) { }

  getArticleMetaData(ids: string[]): Observable<PMCResult[]> {
    ids = ids.map( id => id.replace('PMC', ''))
    let params = { ...ArticlesService.PARAMS, id: ids.join(',')}
    console.log(params)
    return this.http.get(ArticlesService.API, {
      params
    }).map<any, PMCResult[]>( response => ids.map(id => response.result[id]).filter( id => !!id ))
  }

}
