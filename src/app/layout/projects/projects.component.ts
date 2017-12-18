import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../shared/services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects;
  showLoader = false;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.projectService.myProjects()
      .then( projects => {
        this.projects = projects;
        this.showLoader = false;
      });
  }

}
