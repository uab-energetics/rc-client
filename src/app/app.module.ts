import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routedComponents, routes} from './routes';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {FormsModule} from '@angular/forms';
import {LayoutRoutingModule} from './layout/layout-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    LayoutRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
