import {Component, Input, OnInit} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {AppUser} from "../../../models/AppUser";
import {ProjectService} from "../../../shared/services/project.service";
import {NotifyService} from "../../../shared/services/notify.service";
import {InvitationsService} from "../../../shared/services/invitations.service";

@Component({
  selector: 'app-encoders',
  templateUrl: './encoders.component.html',
  styleUrls: ['./encoders.component.css']
})
export class EncodersComponent implements OnInit {

  @Input() project: AppProject;

  users: AppUser[];

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

  sendInvite(user: AppUser){
    console.log(user);
    this.loading++;
    this.projectService.inviteEncoder(this.project.id, user.id)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User..", "But why?"); return [] } )
      .subscribe(() => {
        this.notify.alert('Access Granted!', user.name + " is now a researcher of " + this.project.name );
        this.ngOnInit();
      })
  }

}
