import { Component, OnInit } from '@angular/core';
import {ActiveProjectService} from '../../../active-project/active-project.service'
import {ProjectService} from '../../project.service'
import {AppProject} from '../../AppProject'
import {MatDialogRef} from '@angular/material'
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-list-modal',
  templateUrl: './project-list-modal.component.html',
  styleUrls: ['./project-list-modal.component.css']
})
export class ProjectListModalComponent implements OnInit {

  project: AppProject
  projects: AppProject[]

  constructor(public aps: ActiveProjectService,
              public ps: ProjectService,
              public router: Router,
              public dialogRef: MatDialogRef<ProjectListModalComponent>) {
    this.aps.project$.subscribe( p => this.project = p )
    this.ps.projects$.subscribe( ps => this.projects = ps )
    this.ps.myProjects().subscribe()
  }

  selectProject(project: AppProject) {
    this.aps.setProject(project)
    this.dialogRef.close('project selected')
  }

  createProject() {
    this.router.navigateByUrl('/create-project')
    this.dialogRef.close('create project')
  }

  ngOnInit() {
  }

}
