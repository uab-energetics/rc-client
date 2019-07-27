import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { SharedModule } from './core/shared.module'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PagesModule } from './pages/pages.module'
import { AuthService } from './core/auth/auth.service'
import { AuthInterceptorService } from './core/auth/auth-interceptor.service'
import { ActiveProjectModule } from './core/active-project/active-project.module'
import { mockApiInterceptor } from "../mocking/api-interceptor";
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


let providers = [
  AuthService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
]

if (environment.backendless.enabled)
  providers.push(mockApiInterceptor as any)


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    SharedModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot(),
    PagesModule,
    ActiveProjectModule
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
