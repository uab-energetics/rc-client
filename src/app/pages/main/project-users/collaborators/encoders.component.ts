import {Component, Input, OnInit} from '@angular/core';
import {AppProject} from "../../../../core/projects/AppProject";
import {ProjectService} from "../../../../core/projects/project.service";
import {NotifyService} from "../../../../core/notifications/notify.service";
import {InvitationsService} from "../../../../core/invitations/invitations.service";
import {User} from '../../../../core/auth/models/User'

@Component({
  selector: 'app-encoders',
  templateUrl: './encoders.component.html',
  styleUrls: ['./encoders.component.css']
})
export class EncodersComponent implements OnInit {

  @Input() project: AppProject;

  users: User[];

  inviteEmail: string = "";

  loading = 0;

  constructor(
    private projectService: ProjectService,
    private notify: NotifyService,
    private invitations: InvitationsService
  ) { }

  ngOnInit() {
    this.loading++;
    this.projectService.getEncoders(this.project.id)
      .finally(() => this.loading--)
      .subscribe(users => this.users = users);
  }

  inviteByEmail(email: string){
    this.loading++;
    this.invitations.sendEncoderEmailInvite(this.project.id, email)
      .finally(() => this.loading--)
      .catch(err => {
        this.notify.alert('Oops', "Invite couldn't be sent", "error");
        return [];
      })
      .subscribe( res => this.notify.alert('Invitation Sent!'))
  }

  sendInvite(user: User){
    console.log(user);
    this.loading++;
    this.projectService.inviteEncoder(this.project.id, user.id)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User..", "But why?"); return [] } )
      .subscribe(() => {
        this.notify.alert('Access Granted!', user.name + " is now an encoder of " + this.project.name );
        this.ngOnInit();
      })
  }

  onRemoveEncoder(encoder: User) {
    this.notify.confirm(() => this.removeEncoder(encoder.id), {
      title: "Are you sure?",
      text: "This will remove the encoder from this project and all project forms",
      confirmButtonText: "Remove Encoder"
    })
  }

  removeEncoder(id: number) {
    this.loading++;
    this.projectService.removeEncoder(this.project.id, id)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User.."); return [];})
      .subscribe( () => {
        this.notify.toast("Successfully removed user");
        this.ngOnInit();
      })
  }

}
