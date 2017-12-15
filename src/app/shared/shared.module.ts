import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { TextComponent } from './components/form-elements/text/text.component';
import { NumberComponent } from './components/form-elements/number/number.component';
import { SelectComponent } from './components/form-elements/select/select.component';
import { MultiSelectComponent } from './components/form-elements/multi-select/multi-select.component';
import {MatInputModule, MatRadioModule, MatSelectModule, MatSlider, MatSliderModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BoolComponent } from './components/form-elements/bool/bool.component';
import { QuestionBuilderComponent } from './components/question-builder/question-builder.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule, MatRadioModule, MatSliderModule, MatInputModule
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
    QuestionBuilderComponent
  ],
  exports: [
    NavbarComponent,
    TextComponent,
    NumberComponent,
    SelectComponent,
    MultiSelectComponent,
    BoolComponent,
    QuestionBuilderComponent
  ]
})
export class SharedModule { }
