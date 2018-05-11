import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../../../core/auth/auth.service'
import {User} from '../../../../core/auth/models/User'
import {PeopleService} from '../../../../shared/services/people.service'
import {NotifyService} from '../../../../core/notifications/notify.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  showLoader = false

  constructor(
    private people: PeopleService,
    private authService: AuthService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe( user => this.user = user )
  }

  onSubmit($event) {
    alert('TODO - fix profile update')
    // this.showLoader = true
    // this.authService.updateProfile(this.user)
    //   .finally( () => this.showLoader = false )
    //   .subscribe( () => this.notify.toast('Profile Saved!'))
  }

}
