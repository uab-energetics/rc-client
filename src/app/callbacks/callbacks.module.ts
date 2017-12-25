import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {RedeemInviteComponent} from "./redeem-invite/redeem-invite.component";
import {MatProgressBarModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";

const routes: Route[] = [
  {
    path: "redeem-invite",
    component: RedeemInviteComponent
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
    RedeemInviteComponent
  ]
})
export class CallbacksModule { }
