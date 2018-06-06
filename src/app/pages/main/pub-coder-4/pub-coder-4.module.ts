import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubCoder4Component } from './pub-coder-4.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularMaterialModule} from "../../../core/auth/angular-material/angular.material.module";
import {RouterModule} from "@angular/router";
import {pubCoderRoutes} from "./routes";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PcBodyComponent } from './pc-body/pc-body.component';
import { PcCardComponent } from './pc-card/pc-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pubCoderRoutes),
    FormsModule,
    NgbModule,
    AngularMaterialModule,
  ],
  declarations: [PubCoder4Component, ToolbarComponent, PcBodyComponent, PcCardComponent]
})
export class PubCoder4Module { }
