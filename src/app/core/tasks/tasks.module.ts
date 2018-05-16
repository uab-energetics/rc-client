import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TaskListComponent} from "./components/task-list.component"
import {
  MatChipsModule, MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatSliderModule,
  MatTableModule, MatTooltipModule
} from "@angular/material"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {NgbModule} from "@ng-bootstrap/ng-bootstrap"
import {RouterModule} from "@angular/router"
import {TreeModule} from "angular-tree-component"
import {SharedModule} from "../shared.module"

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    TreeModule,
    SharedModule,
  ],
  declarations: [
    TaskListComponent
  ],
  exports: [
    TaskListComponent
  ]
})
export class TasksModule {
}
