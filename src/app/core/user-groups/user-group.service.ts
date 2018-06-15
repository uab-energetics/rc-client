import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { User } from '../auth/models/User';
import { of } from 'rxjs/observable/of';
import { UserGroup } from './models/UserGroup';

@Injectable()
export class UserGroupService {

  caleb: User = {
    id: 1,
    name: "Caleb Falcione",
    email: "caleb.falcione@gmail.com",
    image: "https://media4.giphy.com/avatars/nikdudukovic/ylDRTR05sy6M.gif",
    location: "Birmingham, AL"
  }

  chris: User = {
    id: 2,
    name: "Chris Rocco",
    email: "chris.rocco7@gmail.com",
    // tslint:disable-next-line:max-line-length
    image: "https://static1.squarespace.com/static/552a5cc4e4b059a56a050501/565f6b57e4b0d9b44ab87107/566024f5e4b0354e5b79dd24/1449141991793/NYCGifathon12.gif",
    location: "Birmingham, AL"
  }

  constructor() { }

  getProjectUsers(project_id): Observable<User[]> {
    return of( [
      this.caleb,
      this.chris,
    ] )
  }

  getProjectGroups = (project_id): Observable<UserGroup[]> => of([
    {
      name: "Researchers",
      users: [
        this.caleb
      ]
    },
    {
      name: "Encoders",
      users: [
        this.caleb,
        this.chris
      ]
    }
  ])

}
