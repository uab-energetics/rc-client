import { NgModule } from "@angular/core";
import { MatProgressBarModule, MatSnackBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSlideToggleModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatTabsModule, MatMenuModule } from "@angular/material";

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
        MatSlideToggleModule
    ]
})
export class AngularMaterialModule {

}