import {Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AuthService} from '../../../core/auth/auth.service'
import {NotifyService} from '../../../core/notifications/notify.service'
import {RedirectService} from '../../../core/auth/redirect.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  model = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  constructor(
    private router: Router,
    private redirectService: RedirectService,
    private authService: AuthService,
    private notify: NotifyService
  ) { }

  onSubmit() {
    this.authService.register(this.exportFormData())
      .subscribe(data => {
        let {redirect, redirectQueryParams} = this.redirectService.getRedirect()
        return this.router.navigateByUrl(
          redirect || '/',
          redirectQueryParams || {}
        )
      }, error => {
        console.error(error)
        this.notify.alert("Invalid", error.error.msg, "error")
      })
  }

  exportFormData() {
    const { email, name, password } = this.model
    return { email, name, password }
  }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full')
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full')
  }

}
