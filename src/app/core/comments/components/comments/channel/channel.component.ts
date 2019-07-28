import {Component, Input, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {CommentsService} from '../../../comments.service'
import {AppChannel} from '../../../../events/AppChannel'
import {DeleteEvent, ReplyEvent} from '../comments.component'
import {NotifyService} from '../../../../notifications/notify.service'
import {AppComment} from '../../../AppComment'
import {AuthService} from '../../../../auth/auth.service'
import {User} from '../../../../auth/user.model'

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  @Input() channelName: string;
  channel: AppChannel;
  user: User;

  originalComments: AppComment[] = [];
  displayComments: AppComment[] = [];

  loading = 0;
  replyMessage: FormControl = new FormControl('');

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private notify: NotifyService
  ) {
    this.authService.user.subscribe( user => this.user = user )
  }

  ngOnInit() {
    // TODO - fix the issue with channel name vs ID
    this.commentsService.getChannel(this.channelName)
      .subscribe( channel => {
        this.commentsService.changes(channel.id)
          .subscribe( () => this.loadChannel() );
      });

    this.loadChannel();
  }


  loadChannel() {
    this.loading++;
    this.commentsService.getChannel(this.channelName)
      .finally(() => this.loading--)
      .subscribe( channel => {
        this.channel = channel;
        this.originalComments = this.channel.root_comment.children;
        this.originalComments.reverse();
        this.loadComments(4);
      });
  }

  loadComments(limit) {
    if(!limit)
      return this.displayComments = [...this.originalComments];
    limit = Math.min(limit, this.originalComments.length);
    this.displayComments = this.originalComments.slice(0, limit);
  }








  onPostComment() {
    this.loading++;
    this.commentsService.commentInChannel(this.channel.id, this.replyMessage.value)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.replyMessage = new FormControl('');
        this.notify.toast('Comment posted.');
        // this.loadChannel();
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
