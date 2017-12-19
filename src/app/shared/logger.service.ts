import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class LoggerService {

  write(...data){
    if(environment.showLog){
      console.log(...data);
    }
  }

}
