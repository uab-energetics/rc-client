import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CommentsService} from "../../../services/comments.service";
import {AppChannel} from "../../../../models/AppChannel";
import {DeleteEvent, ReplyEvent} from "../comments.component";
import {NotifyService} from "../../../services/notify.service";
import {UserService} from "../../../auth/user.service";
import {AppUser} from "../../../../models/AppUser";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  @Input() channelName: string;
  channel: AppChannel;
  user: AppUser;

  loading = 0;

  replyMessage: FormControl = new FormControl('');

  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.loadChannel();
    this.user = this.userService.user;
  }


  loadChannel(){
    this.loading++;
    this.commentsService.getChannel(this.channelName)
      .finally(() => this.loading--)
      .subscribe( channel => this.channel = channel);
  }

  onPostComment(){
    this.loading++;
    this.commentsService.commentInChannel(this.channel.id, this.replyMessage.value)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.replyMessage = new FormControl('');
        this.notify.toast('Comment posted.');
        this.loadChannel();
      })
  }

  onReply($event: ReplyEvent){
    this.loading++;
    this.commentsService.replyToComment($event.comment_id, $event.message)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Reply posted.');
        this.loadChannel();
      })
  }

  onDelete($event: DeleteEvent){
    this.loading++;
    this.commentsService.deleteComment($event.comment_id)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Comment deleted.');
        this.loadChannel();
      })
  }

  onEdit($event: ReplyEvent){
    this.loading++;
    this.commentsService.editComment($event.comment_id, $event.message)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Comment updated.');
        this.loadChannel();
      })
  }

}
