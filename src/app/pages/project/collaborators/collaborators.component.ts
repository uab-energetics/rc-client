import {Component, Input, OnInit} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {AppUser} from "../../../models/AppUser";
import {ProjectService} from "../../../shared/services/project.service";
import {NotifyService} from "../../../shared/services/notify.service";

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {

  @Input() project: AppProject;

  users: AppUser[];

  loading = 0;

  constructor(
    private projectService: ProjectService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.loading++;
    this.projectService.getResearchers(this.project.id)
      .finally(() => this.loading--)
      .subscribe(users => this.users = users);
  }


  sendInvite(user: AppUser){
    console.log(user);
    this.loading++;
    this.projectService.inviteCollaborator(this.project.id, user.id)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User..", "But why?"); return [] } )
      .subscribe(() => {
        this.notify.alert('Access Granted!', user.name + " is now a researcher of " + this.project.name );
        this.ngOnInit();
      })
  }

}
