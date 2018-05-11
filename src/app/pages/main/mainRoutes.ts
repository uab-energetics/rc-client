import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { SettingsComponent } from "./settings/settings.component";
import { ProfileComponent } from "./settings/profile/profile.component";
import { AccountComponent } from "./settings/account/account.component";
import { ProjectsComponent } from "./projects/projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { ProjectComponent } from "./project/project.component";
import { ProjectFormPageComponent } from "./project-form/project-form-page.component";
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { PubCoderComponent } from "./pub-coder/pub-coder.component";
import { ConflictsComponent } from "./conflicts/conflicts.component";
import { DiscussComponent } from "./discuss/discuss.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const mainRoutes: Routes = [
    {
      path: '',
      component: MainComponent,
      children: [
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
          path: "projects/:pid/forms/:fid",
          component: ProjectFormPageComponent
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
          path: "conflicts/:id",
          component: ConflictsComponent
        },
        {
          path: "discuss",
          component: DiscussComponent
        },
        {
          path: "tasks",
          component: TaskListComponent
        },
        {
          path: "welcome",
          component: WelcomeComponent
        },
        {
          path: '',
          redirectTo: 'projects',
          pathMatch: 'full'
        }
      ]
    }
  ];
