import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {AppPublication} from "../../models/AppPublication";
import 'rxjs/add/operator/share';

const api = environment.api;


@Injectable()
export class InvitationsService {

  constructor(
    private http: HttpClient
  ){}

  sendResearcherEmailInvite(project_id: number, email: string){
      return this.http.post(`${api}/invite-researcher-to-project`, {
        project_id: project_id,
        to_email: email,
        callback_url: environment.callbacks.redeemResearcherInvite
      }).share();
  }

  sendEncoderEmailInvite(project_id: number, email: string){
    return this.http.post(`${api}/invite-encoder-to-project`, {
      project_id: project_id,
      to_email: email,
      callback_url: environment.callbacks.redeemEncoderInvite
    }).share();
  }

  validateResearcherInvitation(inviteToken: string): Observable<any> {
    return this.http.get(`${api}/validate-researcher-invite`, {
      params: {
        token: inviteToken
      }
    }).share()
  }

  validateEncoderInvitation(inviteToken: string): Observable<any> {
    return this.http.get(`${api}/validate-encoder-invite`, {
      params: {
        token: inviteToken
      }
    }).share()
  }

  acceptResearcherInvite(token): Observable<any> {
    return this.http.post(`${api}/redeem-researcher-invite`, {
      token
    }).share()
  }

  acceptEncoderInvite(token): Observable<any> {
    return this.http.post(`${api}/redeem-encoder-invite`, {
      token
    }).share()
  }

}
