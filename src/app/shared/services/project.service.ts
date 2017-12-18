import { Injectable } from '@angular/core';
import {Form} from "../../models/Form";
import {AppProject} from "../../models/Project";

@Injectable()
export class ProjectService {

  constructor() { }

  find(projectID: number): Promise<AppProject> {
    return Promise.resolve(mockProjects[0]);
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


const mockProjects: AppProject[] = [
  {
    name: "Murine Rigor",
    description: ""
  },
  {
    name: "Missile",
    description: ""
  }
];
