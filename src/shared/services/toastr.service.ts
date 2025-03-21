import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string = 'Operation was successful!', title: string = 'Success') {
    this.toastr.success(message, title, { timeOut: 3000 });
  }

  showError(message: string = 'An error occurred.', title: string = 'Error') {
    this.toastr.error(message, title, { timeOut: 3000 });
  }

  showInfo(message: string = 'Here is some information.', title: string = 'Info') {
    this.toastr.info(message, title, { timeOut: 3000 });
  }

  showWarning(message: string = 'This is a warning!', title: string = 'Warning') {
    this.toastr.warning(message, title, { timeOut: 3000 });
  }
}
