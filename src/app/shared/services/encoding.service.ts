import { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {factory} from "../../factories/appFactory";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {Form} from "@angular/forms";

@Injectable()
export class EncodingService {

  constructor( ) { }

  getEncoding(id: number): Promise<AppExperimentEncoding> {
    return new Promise(( res, rej ) => {
      let forms = mockEncodings.filter( enc => enc.id = id );
      if(forms.length === 0) rej(404);
      res(forms[0]);
    });
  }

  public calculateCompletion(form: AppForm, encoding): number {
    return Math.ceil(Math.random() * 100);
  }

  public myTasks(){
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(mockTasks);
      }, 300);
    });
  }

}


const mockTasks = [
  {
    id: 1,
    name: 'Screening One',
    completion: 89,
    project: { name: 'Murine Rigor' }
  },
  {
    id: 2,
    name: 'Screening Two',
    completion: 35,
    project: { name: 'Missile' }
  }
];


const mockEncodings: AppExperimentEncoding[] = [
  factory('encoding', {
    id: 5555,
    branches: [
      factory('branch'),
      factory('branch'),
      factory('branch')
    ]
  })
];
