import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../shared/auth/user.service";
import {AppUser} from "../../../models/AppUser";
import {PeopleService} from "../../../shared/services/people.service";
import {NotifyService} from "../../../shared/services/notify.service";
import {AuthService} from "../../../shared/auth/auth.service";

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
    private authService: AuthService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.authService.userEvent.subscribe( newUser => this.user = newUser );
  }

  onSubmit(){
    this.showLoader = true;
    this.authService.updateProfile(this.user)
      .finally( () => this.showLoader = false )
      .subscribe( () => this.notify.toast('Profile Saved!'))
  }

}
