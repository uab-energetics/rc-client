import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const api = environment.api;

@Injectable()
export class NotificationsService {

  notifications = [];

  constructor(
    private http: HttpClient
  ) { }

  markAllRead(){
    return this.http.get(`${api}/notifications/mark-read`)
      .share();
  }

  getUnread(){
    let source = this.http.get<any>(`${api}/notifications`)
      .share();

    source.subscribe((notifications) => { this.notifications = notifications; return notifications });

    return source;
  }

}
