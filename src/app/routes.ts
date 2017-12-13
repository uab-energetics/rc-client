import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './layout/home/home.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
  // TODO - add 404 page
];

const routedComponents = [
  LayoutComponent,
  LoginComponent,
  RegisterComponent
];

export {routes, routedComponents};
