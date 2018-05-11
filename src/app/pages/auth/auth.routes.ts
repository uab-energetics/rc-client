import {RegisterComponent} from './register/register.component'
import {Routes} from '@angular/router'
import {LoginComponent} from './login/login.component'
import {AuthComponent} from './auth.component'

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
]
