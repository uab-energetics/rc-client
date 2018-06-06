import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubCoder4Component } from './pub-coder-4.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularMaterialModule} from "../../../core/auth/angular-material/angular.material.module";
import {RouterModule} from "@angular/router";
import {pubCoderRoutes} from "./routes";
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pubCoderRoutes),
    FormsModule,
    NgbModule,
    AngularMaterialModule,
  ],
  declarations: [PubCoder4Component, ToolbarComponent]
})
export class PubCoder4Module { }
