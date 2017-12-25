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

  validateInvitation(inviteToken: string): Observable<any> {
      return this.http.get(`${api}/validate-invite`, {
        params: {
          token: inviteToken
        }
      }).share()
  }

  sendEmailInvite(project_id: number, email: string){
      return this.http.post(`${api}/invite-to-project`, {
        project_id: project_id,
        to_email: email,
        callback_url: environment.callbacks.redeemInvite
      }).share();
  }

  acceptInvite(token): Observable<any> {
    return this.http.post(`${api}/redeem-invite-token`, {
      token
    }).share()
  }

}
