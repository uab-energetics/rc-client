import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {InsightsComponent} from './insights/insights.component';
import {LayoutComponent} from './layout.component';
import {ProfileComponent} from './settings/profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {AccountComponent} from './settings/account/account.component';
import {SharedModule} from '../shared/shared.module';
import { TasksComponent } from './home/tasks/tasks.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectComponent } from './project/project.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { TreeModule } from 'angular-tree-component';
import { FormLayoutTreeComponent } from './form-builder/form-layout-tree/form-layout-tree.component';
import {MatProgressBarModule} from "@angular/material";
import { PaperCoderComponent } from './paper-coder/paper-coder.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'tasks',
            component: TasksComponent
          },
          {
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'account',
            component: AccountComponent
          },
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'create-project',
        component: CreateProjectComponent
      },
      {
        path: "projects/:id",
        component: ProjectComponent
      },
      {
        path: 'forms/:id',
        component: FormBuilderComponent
      },
      {
        path: 'paper-coder/:id',
        component: PaperCoderComponent
      },
      {
        path: '',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule,
    TreeModule,
    MatProgressBarModule
  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    InsightsComponent,
    SettingsComponent,
    ProfileComponent,
    AccountComponent,
    TasksComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectComponent,
    FormBuilderComponent,
    FormLayoutTreeComponent,
    PaperCoderComponent
  ]
})
export class LayoutModule {
}
