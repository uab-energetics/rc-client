import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroupListComponent} from "./components/form-group-list/form-group-list.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {SharedModule} from "../../core/shared.module";
import {AngularMaterialModule} from "../../core/auth/angular-material/angular.material.module";
import {SelectControl} from "./components/controls/select/select.component";
import {TextControl} from "./components/controls/text/text.component";
import {NumberControl} from "./components/controls/number/number.component";
import {MultiSelectControl} from "./components/controls/multi-select/multi-select.component";
import {BoolControl} from "./components/controls/bool/bool.component";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    FormGroupListComponent,
    FormGroupComponent,
    FormControlComponent,
    SelectControl,
    MultiSelectControl,
    NumberControl,
    BoolControl,
    TextControl
  ],
  exports: [
    FormGroupListComponent,
    FormGroupComponent,
    FormControlComponent,
    SelectControl,
    MultiSelectControl,
    NumberControl,
    BoolControl,
    TextControl
  ]
})
export class RcFormsModule { }
