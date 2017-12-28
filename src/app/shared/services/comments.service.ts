import { Injectable } from '@angular/core';

@Injectable()
export class CommentsService {

  constructor() { }

  commentInChannel(channel_name: string, message: string){
  }

  replyToComment(parent_id: number, message: string){
  }

  editComment(id: number, message: string){
  }

  deleteComment(id: number){
  }

  getChannel(channel_name: string){
  }

}
