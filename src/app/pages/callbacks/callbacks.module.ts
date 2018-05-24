import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {RedeemResearcherInviteComponent} from "./redeem-invite/redeem-researcher-invite.component";
import {RedeemEncoderInviteComponent} from "./redeem-invite/redeem-encoder-invite.component";
import {MatProgressBarModule} from "@angular/material";
import {SharedModule} from "../../core/shared.module";
import {FormsModule} from "@angular/forms";
import { OauthComponent } from './oauth/oauth.component';

const routes: Route[] = [
  {
    path: "redeem-researcher-invite",
    component: RedeemResearcherInviteComponent
  },
  {
    path: "redeem-encoder-invite",
    component: RedeemEncoderInviteComponent
  },
  {
    path: 'oauth',
    component: OauthComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    SharedModule
  ],
  declarations: [
    RedeemResearcherInviteComponent,
    RedeemEncoderInviteComponent,
    OauthComponent
  ]
})
export class CallbacksModule { }
