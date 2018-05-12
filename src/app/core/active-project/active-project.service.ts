import { Injectable } from '@angular/core';
import {AppProject} from '../projects/AppProject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {User} from '../auth/models/User'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class ActiveProjectService {

  private projectSubject: BehaviorSubject<AppProject> = new BehaviorSubject<AppProject>(null);
  readonly project$: Observable<AppProject> = this.projectSubject.asObservable();

  constructor() {}

  setProject(project: AppProject) {
    this.projectSubject.next(project)
  }
}
