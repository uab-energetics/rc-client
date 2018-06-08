import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroupListComponent} from "./components/form-group-list/form-group-list.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {SharedModule} from "../../core/shared.module";
import {AngularMaterialModule} from "../../core/auth/angular-material/angular.material.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
  ],
  declarations: [
    FormGroupListComponent,
    FormGroupComponent,
    FormControlComponent
  ],
  exports: [
    FormGroupListComponent,
    FormGroupComponent,
    FormControlComponent
  ]
})
export class RcFormsModule { }
