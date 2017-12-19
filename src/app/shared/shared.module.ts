import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
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
import { QuestionComponent } from './components/app-form/question/question.component';
import { CategoryComponent } from './components/app-form/category/category.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CategoryBuilderComponent } from './components/category-builder/category-builder.component';
import {FormService} from "./services/form/form.service";
import { ExperimentFormComponent } from './components/app-form/experiment-form/experiment-form.component';
import { BranchComponent } from './components/app-form/branch/branch.component';
import {EncodingService} from "./services/encoding.service";
import { FormFormComponent } from './components/forms/form-form/form-form.component';
import {ProjectService} from "./services/project.service";
import { ProjectFormComponent } from './components/forms/project-form/project-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import { ProjectFormsListComponent } from './components/project-forms-list/project-forms-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule, MatRadioModule, MatSliderModule, MatInputModule, MatIconModule, MatChipsModule, MatProgressBarModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    FormService,
    EncodingService,
    ProjectService
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
    QuestionComponent,
    CategoryComponent,
    CategoryBuilderComponent,
    ExperimentFormComponent,
    BranchComponent,
    FormFormComponent,
    ProjectFormComponent,
    TaskListComponent,
    ProjectFormsListComponent
  ],
  exports: [
    TaskListComponent,
    NavbarComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    MultiSelectComponent,
    BoolComponent,
    QuestionBuilderComponent,
    ChipListComponent,
    QuestionComponent,
    CategoryComponent,
    CategoryBuilderComponent,
    ExperimentFormComponent,
    BranchComponent,
    FormFormComponent,
    ProjectFormComponent,
    ProjectFormsListComponent
  ]
})
export class SharedModule { }
