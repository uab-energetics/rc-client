import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../shared/auth/auth.service';

class LoginFormModel {
  constructor(public email: string,
              public password: string,
              public rememberMe: boolean) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  model = new LoginFormModel('', '', false);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log(this.model);
    this.authService.login({
      email: this.model.email,
      password: this.model.password
    }).then(( data ) => {
      console.log('logged in!', data);
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full');
  }

}
