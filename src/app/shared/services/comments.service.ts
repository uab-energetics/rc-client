import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AppComment} from "../../models/AppComment";
import {AppChannel} from "../../models/AppChannel";
import {of} from 'rxjs/observable/of';

const api = environment.api;

@Injectable()
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  createChannel(channel: AppChannel): Observable<AppChannel> {
    return this.http.post<AppChannel>(`${api}/channels`, channel);
  }

  commentInChannel(channel_id: number, message: string): Observable<AppComment> {
    return this.http.post<AppComment>(`${api}/channels/${channel_id}/comments`, {
      message
    })
  }

  replyToComment(parent_id: number, message: string): Observable<AppComment> {
    return this.http.post<AppComment>(`${api}/comments/${parent_id}/reply`, {
      message
    });
  }

  editComment(id: number, message: string): Observable<AppComment> {
    return this.http.put<AppComment>(`${api}/comments/${id}`, {
      message
    });
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${api}/comments/${id}`);
  }

  getChannel(channel_name: string): Observable<AppChannel> {
    return this.http.get<AppChannel>(`${api}/channels/${channel_name}`);
  }

}
