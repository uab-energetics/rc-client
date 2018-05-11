import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NavbarComponent} from '../core/components/navbar/navbar.component'
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
import {QuestionBuilderComponent} from '../core/form-questions/components/question-builder/question-builder.component'
import {ChipListComponent} from '../core/components/chip-list/chip-list.component'
import {QuestionComponent} from '../core/form-questions/components/question/question.component'
import {CategoryComponent} from '../core/form-categories/components/category/category.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {CategoryBuilderComponent} from '../core/form-categories/components/category-builder/category-builder.component'
import {FormService} from '../core/forms/form.service'
import {BranchComponent} from '../core/form-branch/components/branch/branch.component'
import {EncodingService} from '../core/encodings/encoding.service'
import {ProjectService} from '../core/projects/project.service'
import {NotifyService} from '../core/notifications/notify.service'
import {PublicationsService} from '../core/publications/publications.service'
import {PeopleService} from '../core/users/people.service'
import {SkinService} from '../core/themes/skin.service'
import {ConflictsService} from '../core/conflict-resolution/conflicts.service'
import {NotificationsService} from '../core/notifications/notifications.service'
import {InvitationsService} from '../core/invitations/invitations.service'
import {CommentsComponent} from '../core/comments/components/comments/comments.component'
import {ChannelComponent} from '../core/comments/components/comments/channel/channel.component'
import {CommentsService} from '../core/comments/comments.service'
import {PusherService} from '../core/events/pusher.service'
import {QuestionTreeComponent} from '../core/form-questions/components/question-tree/question-tree.component'
import {TreeModule} from 'angular-tree-component'
import {ProjectFormService} from '../core/projects/project-form.service'
import {PaginatorComponent} from '../core/pagination/components/paginator/paginator.component'
import {BranchQuestionsService} from '../core/encodings/branch-questions.service'
import {TextComponent} from '../core/form-responses/components/response-inputs/text/text.component'
import {BoolComponent} from '../core/form-responses/components/response-inputs/bool/bool.component'
import {MultiSelectComponent} from '../core/form-responses/components/response-inputs/multi-select/multi-select.component'
import {PublicationFormComponent} from '../core/components/forms/publication-form/publication-form.component'
import {EncoderSearchComponent} from '../core/components/forms/user-search/encoder-search.component'
import {DynamicInputComponent} from '../core/form-responses/components/response-inputs/dynamic-input.component'
import {NumberComponent} from '../core/form-responses/components/response-inputs/number/number.component'
import {SelectComponent} from '../core/form-responses/components/response-inputs/select/select.component'
import {FormFormComponent} from '../core/components/forms/form-form/form-form.component'
import {ProjectFormComponent} from '../core/components/forms/project-form/project-form.component'
import {UserSearchComponent} from '../core/components/forms/user-search/user-search.component'
import {FindTaskComponent} from '../core/components/forms/find-task/find-task.component'

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
