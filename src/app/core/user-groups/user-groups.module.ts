import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserGroupService } from './user-group.service'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserGroupService
  ],
  declarations: []
})
export class UserGroupsModule { }
