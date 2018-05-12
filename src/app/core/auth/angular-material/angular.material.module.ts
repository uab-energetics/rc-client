import {NgModule} from '@angular/core'
import {
  MatProgressBarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTabsModule,
  MatMenuModule, MatListModule, MatIconModule
} from '@angular/material'

@NgModule({
  imports: [
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  exports: [
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class AngularMaterialModule {

}
