import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {TextComponent} from './components/response-inputs/text/text.component';
import {NumberComponent} from './components/response-inputs/number/number.component';
import {SelectComponent} from './components/response-inputs/select/select.component';
import {MultiSelectComponent} from './components/response-inputs/multi-select/multi-select.component';
import {
  MatChipsModule,
  MatIconModule, MatInputModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatSelectModule,
  MatSlider,
  MatSliderModule, MatTableDataSource, MatTableModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BoolComponent} from './components/response-inputs/bool/bool.component';
import {QuestionBuilderComponent} from './components/question-builder/question-builder.component';
import {ChipListComponent} from './components/chip-list/chip-list.component';
import {QuestionComponent} from './components/app-form/question/question.component';
import {CategoryComponent} from './components/app-form/category/category.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoryBuilderComponent} from './components/category-builder/category-builder.component';
import {FormService} from './services/form.service';
import {BranchComponent} from './components/app-form/branch/branch.component';
import {EncodingService} from './services/encoding.service';
import {FormFormComponent} from './components/forms/form-form/form-form.component';
import {ProjectService} from './services/project.service';
import {ProjectFormComponent} from './components/forms/project-form/project-form.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {PublicationFormComponent} from './components/forms/publication-form/publication-form.component';
import {NotifyService} from './services/notify.service';
import {PublicationsService} from './services/publications.service';
import {PeopleService} from './services/people.service';
import { FindTaskComponent } from './components/forms/find-task/find-task.component';
import {SkinService} from './services/skin.service';
import {ConflictsService} from './services/conflicts.service';
import {UserSearchComponent} from './components/forms/user-search/user-search.component';
import {NotificationsService} from './services/notifications.service';
import {InvitationsService} from './services/invitations.service';
import { CommentsComponent } from './components/comments/comments.component';
import { ChannelComponent } from './components/comments/channel/channel.component';
import {CommentsService} from './services/comments.service';
import {DynamicInputComponent} from './components/response-inputs/dynamic-input.component';
import {PusherService} from './services/pusher.service';
import { QuestionTreeComponent } from './components/question-tree/question-tree.component';
import { TreeModule } from 'angular-tree-component';
import {ProjectFormService} from "./services/project-form.service";
import { PaginatorComponent } from './components/paginator/paginator.component';
import {EncoderSearchComponent} from "./components/forms/user-search/encoder-search.component";
import {BranchQuestionsService} from "./services/branch-questions.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    TreeModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    FormService,
    EncodingService,
    ProjectService,
    ProjectFormService,
    NotifyService,
    PublicationsService,
    NotificationsService,
    PeopleService,
    SkinService,
    ConflictsService,
    InvitationsService,
    CommentsService,
    BranchQuestionsService,
    PusherService
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
    BranchComponent,
    FormFormComponent,
    ProjectFormComponent,
    PublicationFormComponent,
    FindTaskComponent,
    UserSearchComponent,
    EncoderSearchComponent,
    CommentsComponent,
    ChannelComponent,
    DynamicInputComponent,
    QuestionTreeComponent,
    PaginatorComponent
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
    QuestionComponent,
    CategoryComponent,
    CategoryBuilderComponent,
    BranchComponent,
    FormFormComponent,
    ProjectFormComponent,
    PublicationFormComponent,
    UserSearchComponent,
    EncoderSearchComponent,
    CommentsComponent,
    ChannelComponent,
    FindTaskComponent,
    DynamicInputComponent,
    QuestionTreeComponent,
    PaginatorComponent
  ]
})
export class SharedModule {
}
