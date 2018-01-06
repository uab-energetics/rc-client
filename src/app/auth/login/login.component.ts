import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../shared/auth/auth.service';
import {UserService} from "../../shared/auth/user.service";
import {NotifyService} from "../../shared/services/notify.service";

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
    private authService: AuthService,
    private userService: UserService,
    private notify: NotifyService,
  ) {}

  onSubmit() {
    this.authService.login({
      email: this.model.email,
      password: this.model.password
    }).subscribe(( data ) => {
      console.log('logged in!', data);
    }, error => {
      this.notify.alert("Invalid Credentials", "Please check your email and password and try again", "error")
    });
  }

  ngOnInit(): void {
    if(this.userService.isAuthenticated()){
      this.router.navigate(['/']);
      return;
    }
    document.body.classList.add('page-login-v3', 'layout-full');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full');
  }

}
