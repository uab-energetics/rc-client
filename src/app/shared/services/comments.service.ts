import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AppComment} from "../../models/AppComment";
import {AppChannel} from "../../models/AppChannel";
import {of} from 'rxjs/observable/of';
import {PusherService} from './pusher.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const api = environment.api;

const CHANNEL_CHANGE_EVENT = 'channel-change';

@Injectable()
export class CommentsService {


  changes(channel_id: number): Observable<AppComment> {
    return new Observable<AppComment>( sub => {
      this.ps.pusher.subscribe(`comments.${channel_id}`)
        .bind(CHANNEL_CHANGE_EVENT, (data) => sub.next(data));
    });
  }

  constructor(
    private http: HttpClient,
    private ps: PusherService
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
