import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PubReposService} from "./pub-repos.service";
import { PubRepoFormComponent } from './components/pub-repo-form/pub-repo-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    PubReposService
  ],
  declarations: [PubRepoFormComponent],
  exports: [PubRepoFormComponent]
})
export class PubReposModule { }
