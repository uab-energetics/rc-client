import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {PMCResult} from "./PMCResult";

@Injectable()
export class ArticlesService {

  static API = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
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
    console.log(params)
    return this.http.get(ArticlesService.API, {
      params
    }).map<any, PMCResult[]>( response => {
      return ids
        .map(id => {
          let res = response.result[id]
          if(res) res.embedding_url = this.getEmbeddingURL(id)
          return res
        })
        .filter( id => !!id )
    })
  }

}
