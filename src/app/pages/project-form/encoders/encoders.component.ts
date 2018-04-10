import {Component, Input, OnInit} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {AppUser} from "../../../models/AppUser";
import {ProjectService} from "../../../shared/services/project.service";
import {NotifyService} from "../../../shared/services/notify.service";
import {InvitationsService} from "../../../shared/services/invitations.service";
import {AppForm} from "../../../models/AppForm";
import {ProjectFormService} from "../../../shared/services/project-form.service";

@Component({
  selector: 'app-form-encoders',
  templateUrl: './encoders.component.html',
  styleUrls: ['./encoders.component.css']
})
export class FormEncodersComponent implements OnInit {

  @Input() project: AppProject;
  @Input() form: AppForm;

  users: AppUser[];

  inviteEmail: string = "";

  loading = 0;

  constructor(
    private projectFormService: ProjectFormService,
    private notify: NotifyService,
    private invitations: InvitationsService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading++;
    this.projectFormService.getEncoders(this.project, this.form)
      .finally(() => this.loading--)
      .subscribe(users => this.users = users);
  }

  sendInvite(user: AppUser){
    console.log(user);
    this.loading++;
    this.projectFormService.addEncoder(this.project, this.form, user)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User..", "But why?"); return [] } )
      .subscribe(() => {
        this.notify.alert('Access Granted!', user.name + " is now an encoder of " + this.form.name );
        this.ngOnInit();
      })
  }

  addProjectEncoders() {
    this.projectFormService.inheritProjectEncoders(this.project, this.form)
      .subscribe(() => this.loadUsers());
  }

  onRemoveEncoder(encoder: AppUser) {
    console.log(encoder);
    this.notify.confirm(() => this.removeEncoder(encoder.id), {
      title: "Are you sure?",
      text: "This will remove the encoder from this form",
      confirmButtonText: "Remove Encoder"
    })
  }

  removeEncoder(id: number) {
    this.loading++;
    this.projectFormService.removeEncoder(this.project.id, this.form.id, id)
      .finally(() => this.loading--)
      .catch( err => { this.notify.toast("Invalid User.."); return [];})
      .subscribe( () => {
        this.notify.toast("Successfully removed user");
        this.ngOnInit();
      })
  }


}
