import {Injectable} from '@angular/core'
import {AppProject} from '../projects/AppProject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {ProjectService} from '../projects/project.service'
import {AuthService} from '../auth/auth.service'
import 'rxjs/add/operator/filter'

@Injectable()
export class ActiveProjectService {

  private activeProject: AppProject
  private projectSubject: BehaviorSubject<AppProject> = new BehaviorSubject<AppProject>(null);
  readonly project$: Observable<AppProject> = this.projectSubject.asObservable();

  constructor(private projectService: ProjectService, private authService: AuthService) {

    // update project list when the user changes
    this.authService.user
      .filter( u => u !== null )
      .switchMap( _ => this.projectService.myProjects() )
      .subscribe()

    // save the current project in browser every time it changes
    this.project$
      .filter( p => p !== null )
      .do( project => this.activeProject = project)
      .subscribe(project => this.cacheProject(project))

    // whenever the list of projects has changed, update the active one
    this.projectService.projects$.subscribe( projects => {
      if(projects.length === 0)
        this.projectSubject.next(null)
      if(!this.activeProject)
        this.projectSubject.next(projects[0])
    })
  }

  setProject(project: AppProject) {
    this.projectSubject.next(project)
  }

  cacheProject(project: AppProject) {
    if(!project) return
    localStorage.setItem('active-project', JSON.stringify(project))
  }

  loadProject() {
    // try to load the last project, otherwise, fetch all projects and use first one
    let project = JSON.parse(localStorage.getItem('active-project'))
    if (project) this.projectSubject.next(project)
    else this.projectService.myProjects().subscribe()
  }

  getActiveProject() {
    return this.activeProject
  }

}
