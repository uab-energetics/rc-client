import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ProjectListModalComponent} from './components/project-list-modal/project-list-modal.component'
import {ActiveProjectModule} from '../active-project/active-project.module'

@NgModule({
  imports: [
    CommonModule,
    ActiveProjectModule
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
