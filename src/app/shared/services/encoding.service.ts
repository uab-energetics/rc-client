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
  {
    "id": 5555,
    "name": "Encoding 8665",
    "form_id": 820,
    "branches": [
      {
        "name": "Branch 3390",
        "responses": [
          {
            "id": 4651,
            "question_id": 1,
            "type": "sel",
            "num": 12,
            "sel": "Beer",
            "txt": "Secret places of vision will oddly forget a unconditional thing."
          },
          {
            "id": 3215,
            "question_id": 3,
            "type": "txt",
            "num": 12,
            "sel": "Salvus cottas ducunt",
            "txt": "Secret places of vision will oddly forget a unconditional thing."
          },
          {
            "id": 4319,
            "question_id": 5,
            "type": "num",
            "num": 20,
            "sel": "Salvus cottas ducunt",
            "txt": "Secret places of vision will oddly forget a unconditional thing."
          },
          {
            "id": 4319,
            "question_id": 2,
            "type": "multi-sel",
            "num": 20,
            "sel": "Salvus cottas ducunt",
            "txt": "Secret places of vision will oddly forget a unconditional thing.",
            "multi-sel": [
              { 'txt': 'Pulp Fiction' }
            ]
          }
        ]
      }
    ]
  }
];
