import {Injectable} from '@angular/core'
import {AppProject} from '../projects/AppProject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {ProjectService} from '../projects/project.service'

@Injectable()
export class ActiveProjectService {

  private activeProject: AppProject
  private projectSubject: BehaviorSubject<AppProject> = new BehaviorSubject<AppProject>(null);
  readonly project$: Observable<AppProject> = this.projectSubject.asObservable();

  constructor(private projectService: ProjectService) {
    this.project$.subscribe( p => this.activeProject = p )

    this.projectService.projects$.subscribe( projects => {
      if(projects.length === 0)
        this.projectSubject.next(null)
    })

    this.projectService.myProjects()
      .subscribe( projects => {
        if(projects.length === 0)
          this.projectSubject.next(projects[0])
      })
  }

  setProject(project: AppProject) {
    this.projectSubject.next(project)
  }

}
