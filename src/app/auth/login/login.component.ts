import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

class LoginFormModel {
  constructor(public email: string,
              public password: string,
              public rememberMe: boolean) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  model = new LoginFormModel('', '', false);

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full');
  }

}
