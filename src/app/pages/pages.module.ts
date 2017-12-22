import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {InsightsComponent} from './insights/insights.component';
import {ProfileComponent} from './settings/profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {AccountComponent} from './settings/account/account.component';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectComponent } from './project/project.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { TreeModule } from 'angular-tree-component';
import { FormLayoutTreeComponent } from './form-builder/form-layout-tree/form-layout-tree.component';
import {MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule} from "@angular/material";
import { PubCoderComponent } from './pub-coder/pub-coder.component';
import {FormsModule} from "@angular/forms";
import {PagesComponent} from "./page.component";
import {ProjectFormsComponent} from "./project/forms/project-forms.component";
import {ProjectPublicationsComponent} from "./project/publications/project-publications.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: []
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
        path: 'pub-coder/:id',
        component: PubCoderComponent
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
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    TreeModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    InsightsComponent,
    SettingsComponent,
    ProfileComponent,
    AccountComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectComponent,
    FormBuilderComponent,
    FormLayoutTreeComponent,
    ProjectFormsComponent,
    ProjectPublicationsComponent,
    PubCoderComponent
  ]
})
export class PagesModule {
}
