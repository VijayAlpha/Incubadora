import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class CommonToastrService {

  matDialogRef: MatDialogRef<any>;
  statusMatDialogRef: MatDialogRef<any>;

constructor(private nbToastrService : NbToastrService) { }

showSuccess(message?:string,title?:string)
{
  this.nbToastrService.success(message,title);
}
showFailure(message?:string,title?:string)
{
  this.nbToastrService.danger(message,title);
}
showWarning(message?:string,title?:string)
{
  this.nbToastrService.warning(message,title);
}
}
