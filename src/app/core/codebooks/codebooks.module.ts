import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderComponent } from './render/render.component';
import { RenderQuestionComponent } from './render/render-question/render-question.component';
import { RenderCategoryComponent } from './render/render-category/render-category.component';
import {SharedModule} from "../shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    RenderComponent, RenderQuestionComponent, RenderCategoryComponent
  ],
  exports: [
    RenderComponent, RenderQuestionComponent, RenderCategoryComponent
  ]
})
export class CodebooksModule { }
