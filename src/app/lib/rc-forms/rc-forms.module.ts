import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroupListComponent} from "./components/form-group-list/form-group-list.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {SelectControl} from "./components/controls/select/select.component";
import {TextControl} from "./components/controls/text/text.component";
import {NumberControl} from "./components/controls/number/number.component";
import {MultiSelectControl} from "./components/controls/multi-select/multi-select.component";
import {BoolControl} from "./components/controls/bool/bool.component";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    CdkTableModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatExpansionModule,
    MatToolbarModule
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
