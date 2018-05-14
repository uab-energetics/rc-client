import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {SharedModule} from './core/shared.module'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {SweetAlertService} from 'ng2-sweetalert2'
import {PagesModule} from './pages/pages.module'
import {AuthService} from './core/auth/auth.service'
import {AuthInterceptorService} from './core/auth/auth-interceptor.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot(),
    PagesModule
  ],
  providers: [
    AuthService,
    SweetAlertService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
