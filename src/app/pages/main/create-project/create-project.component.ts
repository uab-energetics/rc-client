import { Component, OnInit } from '@angular/core'
import {Router, RouterModule} from "@angular/router"
import {ProjectService} from '../../../core/projects/project.service'
import {AppProject} from '../../../core/projects/AppProject'

class ProjectModel {
  constructor(
    public name: string,
    public description: string
  ){}
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  projectModel = new ProjectModel('', '')

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  onProjectFormSubmit(project: AppProject){
    this.projectService.createProject(project)
      .subscribe( newProject => this.router.navigate(['/projects']))
  }

}
