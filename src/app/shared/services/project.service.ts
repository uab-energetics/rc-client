import { Injectable } from '@angular/core';
import {Form} from "../../models/Form";
import {AppProject} from "../../models/Project";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectService {

  constructor() { }

  find(projectID: number): Promise<AppProject> {
    return Promise.resolve(mockProjects[0]);
  }

  createProject(project: AppProject){
    return new Promise((res, rej) => {
      project.id = Math.random();
      mockProjects.push(project);
      res(Object.assign({}, project));
    })
  }

  deleteProject(projectID: number){
    return new Observable((subject) => {
      mockProjects = mockProjects.filter( p => p.id !== projectID );
      subject.next(mockProjects);
    })
  }

  createForm(projectID: number, form: Form): Promise<Form> {
    return new Promise((res, rej)=>{
      setTimeout(() => res(form), 1400);
    })
  }

  myProjects(): Promise<AppProject[]> {
    return new Promise((res, rej)=>{
      setTimeout(() => res(mockProjects), 1300);
    })
  }

}


let mockProjects: AppProject[] = [
  {
    id: 1,
    name: "Murine Rigor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
  },
  {
    id: 2,
    name: "Missile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
  }
];
