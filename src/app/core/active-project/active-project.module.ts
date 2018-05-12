import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActiveProjectService} from './active-project.service'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ActiveProjectService
  ],
  declarations: []
})
export class ActiveProjectModule { }
