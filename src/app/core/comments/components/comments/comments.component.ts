import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

export interface ReplyEvent {
  comment_id: number;
  message: string;
}

export interface DeleteEvent {
  comment_id: number;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment;
  @Input() userID: number;
  @Input() root = false;
  @Output() onReply = new EventEmitter<ReplyEvent>();
  @Output() onEdit = new EventEmitter<ReplyEvent>();
  @Output() onDelete = new EventEmitter<DeleteEvent>();

  showReplyBox = false;
  showEditBox = false;
  expanded = true;
  replyInput: FormControl = new FormControl('');

  onReplySubmit(){
    this.onReply.emit({
      comment_id: this.comment.id,
      message: this.replyInput.value
    });
  }

  toggleReplyBox(){
    this.showReplyBox = !this.showReplyBox;
  }

  toggleEditBox(){
    this.showEditBox = !this.showEditBox;
  }

  toggleExpanded(){
    this.expanded = !this.expanded;
  }

  deleteComment(){
    // TODO
    console.log('deleting...', this.comment.id);
    let res = confirm('Are you sure? this action cannot be undone!');
    if(res){
      this.onDelete.emit({
        comment_id: this.comment.id
      });
    }
  }

  editComment(newMessage: string){
    // TODO
    console.log('editing...', newMessage);
    this.toggleEditBox();
    this.onEdit.emit({
      comment_id: this.comment.id,
      message: newMessage
    });
  }

  constructor() { }

  ngOnInit() {
    console.log(this.userID);

    /* TODO - change this: */
    if(this.comment.message === 'deleted')
      this.comment.deleted = true;
  }

}
