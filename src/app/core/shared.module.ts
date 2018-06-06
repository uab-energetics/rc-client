import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NavbarComponent} from '../pages/shared/navbar/navbar.component'
import {RouterModule} from '@angular/router'
import {
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {QuestionBuilderComponent} from './form-questions/components/question-builder/question-builder.component'
import {ChipListComponent} from './components/chip-list/chip-list.component'
import {QuestionComponent} from './form-questions/components/question/question.component'
import {CategoryComponent} from './form-categories/components/category/category.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {CategoryBuilderComponent} from './form-categories/components/category-builder/category-builder.component'
import {FormService} from './forms/form.service'
import {BranchComponent} from './form-branch/components/branch/branch.component'
import {EncodingService} from './encodings/encoding.service'
import {ProjectService} from './projects/project.service'
import {NotifyService} from './notifications/notify.service'
import {PublicationsService} from './publications/publications.service'
import {PeopleService} from './users/people.service'
import {SkinService} from './themes/skin.service'
import {ConflictsService} from './conflict-resolution/conflicts.service'
import {NotificationsService} from './notifications/notifications.service'
import {InvitationsService} from './invitations/invitations.service'
import {CommentsComponent} from './comments/components/comments/comments.component'
import {ChannelComponent} from './comments/components/comments/channel/channel.component'
import {CommentsService} from './comments/comments.service'
import {PusherService} from './events/pusher.service'
import {QuestionTreeComponent} from './form-questions/components/question-tree/question-tree.component'
import {TreeModule} from 'angular-tree-component'
import {ProjectFormService} from './projects/project-form.service'
import {PaginatorComponent} from './pagination/components/paginator/paginator.component'
import {BranchQuestionsService} from './encodings/branch-questions.service'
import {TextComponent} from './form-responses/components/response-inputs/text/text.component'
import {BoolComponent} from './form-responses/components/response-inputs/bool/bool.component'
import {MultiSelectComponent} from './form-responses/components/response-inputs/multi-select/multi-select.component'
import {PublicationFormComponent} from './components/forms/publication-form/publication-form.component'
import {EncoderSearchComponent} from './components/forms/user-search/encoder-search.component'
import {DynamicInputComponent} from './form-responses/components/response-inputs/dynamic-input.component'
import {NumberComponent} from './form-responses/components/response-inputs/number/number.component'
import {SelectComponent} from './form-responses/components/response-inputs/select/select.component'
import {FormFormComponent} from './components/forms/form-form/form-form.component'
import {ProjectFormComponent} from './components/forms/project-form/project-form.component'
import {UserSearchComponent} from './components/forms/user-search/user-search.component'
import {FindTaskComponent} from './components/forms/find-task/find-task.component';
import {TaskService} from "./tasks/task.service";


/*
*
* TODO - give each feature its own module!!!!!!!!!!!!!
*
*/





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
    FormService,
    EncodingService,
    TaskService,
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
    PaginatorComponent,
  ],
  exports: [
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
    PaginatorComponent,
  ]
})
export class SharedModule {
}
