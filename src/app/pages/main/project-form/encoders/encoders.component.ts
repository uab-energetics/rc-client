import {Component, Input, OnInit} from '@angular/core'
import {AppProject} from '../../../../core/projects/AppProject'
import {NotifyService} from '../../../../core/notifications/notify.service'
import {InvitationsService} from '../../../../core/invitations/invitations.service'
import {AppForm} from '../../../../core/forms/AppForm'
import {ProjectFormService} from '../../../../core/projects/project-form.service'
import {User} from '../../../../core/auth/models/User'

@Component({
  selector: 'app-form-encoders',
  templateUrl: './encoders.component.html',
  styleUrls: ['./encoders.component.css']
})
export class FormEncodersComponent implements OnInit {

  @Input() project: AppProject;
  @Input() form: AppForm;

  users: User[];

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

  sendInvite(user: User){
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

  onRemoveEncoder(encoder: User) {
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
