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
  MatMenuModule, MatListModule, MatIconModule, MatTooltipModule, MatButtonModule
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
    MatTooltipModule,
    MatButtonModule,
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
    MatTooltipModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class AngularMaterialModule {

}
