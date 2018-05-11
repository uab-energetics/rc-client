import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../../../core/auth/auth.service'
import {UserService} from '../../../../shared/auth/user.service'
import {User} from '../../../../core/auth/models/User'
import {PeopleService} from '../../../../shared/services/people.service'
import {NotifyService} from '../../../../shared/services/notify.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  showLoader = false

  constructor(
    private userService: UserService,
    private people: PeopleService,
    private authService: AuthService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.authService.user.subscribe( newUser => this.user = newUser )
  }

  onSubmit($event) {
    alert('TODO - fix profile update')
    // this.showLoader = true
    // this.authService.updateProfile(this.user)
    //   .finally( () => this.showLoader = false )
    //   .subscribe( () => this.notify.toast('Profile Saved!'))
  }

}
