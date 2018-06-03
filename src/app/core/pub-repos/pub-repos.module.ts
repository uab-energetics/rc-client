import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PubReposService} from "./pub-repos.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PubReposService
  ],
  declarations: []
})
export class PubReposModule { }
