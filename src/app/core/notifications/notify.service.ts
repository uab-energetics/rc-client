import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

import swal from 'sweetalert2'

@Injectable()
export class NotifyService {

  swal: any

  constructor(public materialSnackBar: MatSnackBar) {
    this.swal = swal
    console.log(swal)
  }

  toast(message: string, action: string = 'Ok', options: MatSnackBarConfig = {
    verticalPosition: 'top',
    duration: 1500
  }) {
    this.materialSnackBar.open(message, action, options);
  }

  prompt(message, def = null){
    if(!def) return prompt(message);
    return prompt(message, def);
  }

  alert(title, message = '', type = 'success'){
    this.swal(title, message, type);
  }

  confirm(callback, {
      title = 'Are you sure?',
      text = "This action cannot be undone!",
      confirmButtonText = "Yes, delete it."
  } = {}): void {
    this.swal({
      title,
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText
    }).then((result) => {
      console.log(result);
      if (result) {
        callback()
      }
    });
  }

}
