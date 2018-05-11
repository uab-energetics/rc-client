import {Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthService} from '../../../core/auth/auth.service'
import {NotifyService} from '../../../shared/services/notify.service'
import {RedirectService} from '../../../core/auth/redirect.service'

class LoginFormModel {
  constructor(
    public email: string,
    public password: string,
    public rememberMe: boolean
  ) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  model = new LoginFormModel('', '', false)

  constructor(
    private router: Router,
    private authService: AuthService,
    private redirectService: RedirectService,
    private notify: NotifyService,
  ) {}

  onSubmit() {
    this.authService.login({
      email: this.model.email,
      password: this.model.password
    }).subscribe(
      res => {
        let {redirect, redirectQueryParams} = this.redirectService.getRedirect()
        this.router.navigateByUrl(redirect, redirectQueryParams)
      },
      err => {
        this.notify.alert("Invalid Credentials", "Please check your email and password and try again", "error")
      }
    )
  }

  ngOnInit() {
    document.body.classList.add('page-login-v3', 'layout-full')
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full')
  }

}
