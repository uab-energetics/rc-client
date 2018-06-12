import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {PMCResult} from "./PMCResult";
import {environment} from "../../../environments/environment";

@Injectable()
export class ArticlesService {

  static API = `${environment.api}/pmc-api`
  static PUB_READER = "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC{{id}}"
  static PARAMS = {
    db: 'pmc',
    tool: 'Research_Coder',
    email: 'chris.rocco7@gmail.com',
    retmode: 'json'
  }

  constructor(private http: HttpClient) { }

  getEmbeddingURL(articleID: string) {
    return ArticlesService.PUB_READER.replace('{{id}}', articleID.replace('PMC', ''))
  }

  getArticleMetaData(ids: string[]): Observable<PMCResult[]> {
    ids = ids.map( id => id.replace('PMC', ''))
    let params = { ...ArticlesService.PARAMS, id: ids.join(',')}
    return this.http.get(ArticlesService.API, {
      params
    }).map<any, PMCResult[]>( response => {
      return ids
        .filter( id => {
          const res = response.result[id]
          return res && !res.error
        } )
        .map(id => {
          const res = response.result[id]
          res.embedding_url = this.getEmbeddingURL(id)
          res.articleIdMap = res.articleids.reduce((map, {idtype, value}) => {
            map[idtype] = value
            return map
          }, {})

          return res
        })
        .filter( id => !!id )
    })
  }

}
