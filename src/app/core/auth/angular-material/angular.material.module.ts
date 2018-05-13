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
  MatMenuModule, MatListModule, MatIconModule, MatTooltipModule, MatButtonModule, MatCardModule
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
    MatSlideToggleModule,
    MatCardModule
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
    MatSlideToggleModule,
    MatCardModule
  ]
})
export class AngularMaterialModule {

}
