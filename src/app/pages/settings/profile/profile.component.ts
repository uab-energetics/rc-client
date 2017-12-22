import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../shared/auth/user.service";
import {AppUser} from "../../../models/AppUser";
import {PeopleService} from "../../../shared/services/people.service";
import {NotifyService} from "../../../shared/services/notify.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: AppUser;
  showLoader = false;

  constructor(
    private userService: UserService,
    private people: PeopleService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.user = Object.assign({}, this.userService.user);
  }

  onSubmit(){
    this.showLoader = true;
    this.people.updateMyProfile(this.user)
      .finally( () => this.showLoader = false )
      .subscribe( () => this.notify.toast('Profile Saved!'))
  }

}
