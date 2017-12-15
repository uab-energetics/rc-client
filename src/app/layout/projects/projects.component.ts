import { Component, OnInit } from '@angular/core';
import {projects} from '../../../../test/data/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects;

  constructor() {
    this.projects = projects;
  }

  ngOnInit() {
  }

}
