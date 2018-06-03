import {mainRoutes} from './mainRoutes'
import {AngularMaterialModule} from '../../core/auth/angular-material/angular.material.module'
import {CommonModule} from '@angular/common'
import {SharedModule} from '../../core/shared.module'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {TreeModule} from 'angular-tree-component'
import {PagesComponent} from '../page.component'
import {MainComponent} from './main.component'
import {MyTasksPageComponent} from './my-tasks-page/my-tasks-page.component'
import {ProfileComponent} from './settings/profile/profile.component'
import {ProjectsComponent} from './projects/projects.component'
import {InsightsComponent} from './insights/insights.component'
import {AccountComponent} from './settings/account/account.component'
import {SettingsComponent} from './settings/settings.component'
import {CreateProjectComponent} from './create-project/create-project.component'
import {FormBuilderComponent} from './form-builder/form-builder.component'
import {ProjectFormsComponent} from './project-forms/project-forms.component'
import {ProjectFormPageComponent} from './project-form/project-form-page.component'
import {FormPublicationsComponent} from './project-form/publications/form-publications.component'
import {ProjectPublicationsComponent} from './project-publications/project-publications.component'
import {PubCoderComponent} from './pub-coder/pub-coder.component'
import {ExperimentFormComponent} from './pub-coder/experiment-form/experiment-form.component'
import {ConflictsComponent} from './conflicts/conflicts.component'
import {CollaboratorsComponent} from './project-users/collaborators/collaborators.component'
import {ProjectFormSettingsComponent} from './project-form/settings/project-form-settings.component'
import {FormEncodersComponent} from './project-form/encoders/encoders.component'
import {DiscussComponent} from './discuss/discuss.component'
import {WelcomeComponent} from './welcome/welcome.component'
import {CodeBookTreeComponent} from './form-builder/codebook-tree/codebook-tree.component'
import {EncodingTreeComponent} from './pub-coder/encoding-tree/encoding-tree.component'
import {StructureEditorComponent} from './pub-coder/structure-editor/structure-editor.component'
import {EncodersComponent} from './project-users/collaborators/encoders.component'
import {SidebarModule} from '../../core/components/sidebar/sidebar.module'
import {ActiveProjectModule} from '../../core/active-project/active-project.module';
import { ProjectUsersComponent } from './project-users/project-users.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component'
import {ProjectsModule} from '../../core/projects/projects.module'
import {MatTableModule} from '@angular/material'
import {TasksModule} from "../../core/tasks/tasks.module";
import { PubReposComponent } from './pub-repos/pub-repos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(mainRoutes),
    NgbModule,
    TreeModule,
    AngularMaterialModule,
    SharedModule,
    SidebarModule,
    ProjectsModule,
    ActiveProjectModule,
    TasksModule,
    MatTableModule,
  ],
  declarations: [
    EncodersComponent,
    MainComponent,
    PagesComponent,
    MyTasksPageComponent,
    InsightsComponent,
    SettingsComponent,
    ProfileComponent,
    AccountComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectUsersComponent,
    FormBuilderComponent,
    ProjectFormsComponent,
    ProjectFormPageComponent,
    FormPublicationsComponent,
    ProjectPublicationsComponent,
    PubCoderComponent,
    ExperimentFormComponent,
    ConflictsComponent,
    CollaboratorsComponent,
    ProjectFormSettingsComponent,
    FormEncodersComponent,
    DiscussComponent,
    WelcomeComponent,
    CodeBookTreeComponent,
    EncodingTreeComponent,
    StructureEditorComponent,
    ProjectDashboardComponent,
    PubReposComponent,
  ]
})
export class MainModule {
}
