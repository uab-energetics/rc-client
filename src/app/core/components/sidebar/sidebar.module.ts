import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component'
import {AngularMaterialModule} from '../../auth/angular-material/angular.material.module'
import {Router} from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    Router,
    AngularMaterialModule
  ],
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
