import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class NotifyService {

  constructor(
    private materialSnackBar: MatSnackBar
  ) { }

  toast(message: string, action: string = 'Ok', options: MatSnackBarConfig = { verticalPosition: 'top', duration: 1500 }){
    this.materialSnackBar.open(message, action, options);
  }

}
