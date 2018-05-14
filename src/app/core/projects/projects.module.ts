import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectListComponent} from './components/project-list/project-list.component';
import { ProjectListModalComponent } from './components/project-list-modal/project-list-modal.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectListModalComponent
  ],
  entryComponents: [
    ProjectListModalComponent
  ],
  exports: [
    ProjectListModalComponent
  ]
})
export class ProjectsModule { }
