import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {SweetAlertService} from "ng2-sweetalert2";

@Injectable()
export class NotifyService {

  constructor(private materialSnackBar: MatSnackBar,
              private sweetAlerts: SweetAlertService) {
  }

  toast(message: string, action: string = 'Ok', options: MatSnackBarConfig = {
    verticalPosition: 'top',
    duration: 1500
  }) {
    this.materialSnackBar.open(message, action, options);
  }

  prompt(message){
    return prompt(message);
  }

  confirm(callback, {
      title = 'Are you sure?',
      text = "This action cannot be undone!",
      confirmButtonText = "Yes, delete it."
  } = {}): void {
    this.sweetAlerts.swal({
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
