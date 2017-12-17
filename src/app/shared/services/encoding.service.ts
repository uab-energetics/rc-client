import { Injectable } from '@angular/core';
import {Form} from "../../models/Form";

@Injectable()
export class EncodingService {

  constructor() { }

  public calculateCompletion(form: Form, encoding): number {
    return Math.ceil(Math.random() * 100);
  }

}
