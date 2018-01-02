import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const api = environment.api;

@Injectable()
export class BranchQuestionsService {

  constructor(private http: HttpClient) { }

  addQuestion(branch_id, question_id) {
    return this.http.post(`${api}/branches/${branch_id}/questionMap/${question_id}`, {});
  }

  removeQuestion(branch_id, question_id){
    return this.http.delete(`${api}/branches/${branch_id}/questionMap/${question_id}`);
  }

  getQuestions(branch_id){
    return this.http.get(`${api}/branches/${branch_id}/questionMap`);
  }

}
