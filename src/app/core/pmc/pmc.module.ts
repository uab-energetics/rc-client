import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticlesService} from "./articles.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ArticlesService
  ],
  declarations: []
})
export class PmcModule { }
