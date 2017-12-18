import { Injectable } from '@angular/core';
import {Form} from "../../models/Form";
import {AppProject} from "../../models/Project";

@Injectable()
export class ProjectService {

  constructor() { }

  find(projectID: number): Promise<AppProject> {
    return Promise.resolve(mockProject);
  }

  createForm(projectID: number, form: Form): Promise<Form> {
    return new Promise((res, rej)=>{
      setTimeout(() => res(form), 1400);
    })
  }

}


const mockProject = {
  name: 'mock project',
  description: 'dummy project'
};
