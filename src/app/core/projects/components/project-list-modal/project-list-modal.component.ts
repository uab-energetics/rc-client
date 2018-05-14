import { Component, OnInit } from '@angular/core';
import {ActiveProjectService} from '../../../active-project/active-project.service'
import {ProjectService} from '../../project.service'
import {AppProject} from '../../AppProject'
import {MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-project-list-modal',
  templateUrl: './project-list-modal.component.html',
  styleUrls: ['./project-list-modal.component.css']
})
export class ProjectListModalComponent implements OnInit {

  project: AppProject
  projects: AppProject[]

  constructor(public aps: ActiveProjectService, public ps: ProjectService, public dialogRef: MatDialogRef<ProjectListModalComponent>) {
    this.aps.project$.subscribe( p => this.project = p )
    this.ps.projects$.subscribe( ps => this.projects = ps )
    this.ps.myProjects().subscribe()
  }

  selectProject(project: AppProject) {
    this.aps.setProject(project)
    this.dialogRef.close('project selected')
  }

  ngOnInit() {
  }

}
