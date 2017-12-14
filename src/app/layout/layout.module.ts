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

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    InsightsComponent,
    SettingsComponent,
    ProfileComponent,
    AccountComponent
  ]
})
export class LayoutModule {
}
