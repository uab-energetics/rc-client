import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PubCoder4Component} from './pub-coder-4.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularMaterialModule} from "../../../core/auth/angular-material/angular.material.module";
import {RouterModule} from "@angular/router";
import {pubCoderRoutes} from "./routes";
import {PcToolbarComponent} from './pc-toolbar/pc-toolbar.component';
import {PcBodyComponent} from './pc-body/pc-body.component';
import {SharedModule} from "../../../core/shared.module";
import { PcFormControlComponent } from './pc-form-control/pc-form-control.component';
import { PcFormGroupComponent } from './pc-form-group/pc-form-group.component';
import { PcFormGroupListComponent } from './pc-form-group-list/pc-form-group-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pubCoderRoutes),
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [
    PubCoder4Component,
    PcToolbarComponent,
    PcBodyComponent,
    PcFormControlComponent,
    PcFormGroupComponent,
    PcFormGroupListComponent,
  ]
})
export class PubCoder4Module {
}
