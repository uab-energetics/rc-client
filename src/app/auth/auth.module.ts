import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {NotifyService} from "../shared/services/notify.service";
import {
  MatCheckbox, MatCheckboxModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';

const routes: Routes = [
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
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
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
