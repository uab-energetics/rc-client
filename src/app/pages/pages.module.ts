import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import { pageRoutes } from './pages.routing'
import { FormsModule } from '@angular/forms'
import {AuthModule} from '../core/auth/auth.module'
import {SharedModule} from '../core/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(pageRoutes),
    AuthModule,
    SharedModule
  ]
})
export class PagesModule {
}
