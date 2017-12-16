import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth/auth.service';
import { TextComponent } from './components/response-inputs/text/text.component';
import { NumberComponent } from './components/response-inputs/number/number.component';
import { SelectComponent } from './components/response-inputs/select/select.component';
import { MultiSelectComponent } from './components/response-inputs/multi-select/multi-select.component';
import {
  MatChipsModule,
  MatIconModule, MatInputModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatSlider,
  MatSliderModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BoolComponent } from './components/response-inputs/bool/bool.component';
import { QuestionBuilderComponent } from './components/question-builder/question-builder.component';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { FormComponent } from './components/form/form.component';
import { QuestionComponent } from './components/form/question/question.component';
import { CategoryComponent } from './components/form/category/category.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule, MatRadioModule, MatSliderModule, MatInputModule, MatIconModule, MatChipsModule, MatProgressBarModule
  ],
  providers: [
    AuthService
  ],
  declarations: [
    NavbarComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    MultiSelectComponent,
    BoolComponent,
    QuestionBuilderComponent,
    ChipListComponent,
    FormComponent,
    QuestionComponent,
    CategoryComponent
  ],
  exports: [
    NavbarComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    MultiSelectComponent,
    BoolComponent,
    QuestionBuilderComponent,
    ChipListComponent,
    FormComponent,
    QuestionComponent,
    CategoryComponent
  ]
})
export class SharedModule { }
