import { Injectable } from '@angular/core';
import {AppForm} from "../../models/AppForm";

@Injectable()
export class EncodingService {

  constructor( ) { }

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
