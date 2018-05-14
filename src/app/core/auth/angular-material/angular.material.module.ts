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
  MatMenuModule, MatListModule, MatIconModule, MatTooltipModule, MatButtonModule, MatCardModule, MatDialogModule
} from '@angular/material'
import {CdkTableModule} from '@angular/cdk/table'

@NgModule({
  imports: [
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
    MatDialogModule
  ],
  exports: [
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
    MatDialogModule
  ]
})
export class AngularMaterialModule {

}
