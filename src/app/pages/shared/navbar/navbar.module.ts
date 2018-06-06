import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AngularMaterialModule} from '../../../core/auth/angular-material/angular.material.module'
import {RouterModule} from '@angular/router'
import {NavbarComponent} from "./navbar.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
