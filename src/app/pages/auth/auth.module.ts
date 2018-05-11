import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {RouterModule} from '@angular/router'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {FormsModule} from '@angular/forms'
import {AuthComponent} from './auth.component'
import {MatSnackBarModule} from '@angular/material'
import {NotifyService} from '../../core/notifications/notify.service'
import {authRoutes} from './auth.routes'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authRoutes),
    MatSnackBarModule
  ],
  providers: [
    NotifyService
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
