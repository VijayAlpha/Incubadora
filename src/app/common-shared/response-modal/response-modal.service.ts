import { Injectable } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ResponseModalComponent } from "./response-modal.component";

@Injectable({
  providedIn: "root",
})
export class ResponseModalService {
  matDialogRef: MatDialogRef<any>;
  statusMatDialogRef: MatDialogRef<any>;
  constructor(private matDialog: MatDialog) {}
  OpenStatusModal = (icon: string, title: string, description: string) => {
    this.statusMatDialogRef = this.matDialog.open(ResponseModalComponent, {
      data: { icon: icon, title: title, description: description },
      disableClose: true,
       width: "20%",
       height:"auto"
    });

    this.statusMatDialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
      }
    });
  };
  openModalSM = (component: any, editData: any) => {
    return (this.matDialogRef = this.matDialog.open(component, {
      height: "auto",
      width: "30%",
      data: editData,
      disableClose: true,
    }));
  };
  openModalSMD = (component: any, editData: any) => {
    return (this.matDialogRef = this.matDialog.open(component, {
      height: "auto",
      width: "40%",
      data: editData,
      disableClose: true,
    }));
  };
  openModalMD = (component: any, editData: any) => {
    return (this.matDialogRef = this.matDialog.open(component, {
      height: "auto",
      width: "60%",
      data: editData,
      panelClass: "mat-dialog-height-transition",
      disableClose: true,
    }));
  };
  openModalLG = (component: any, editData: any) => {
    return (this.matDialogRef = this.matDialog.open(component, {
      height: "auto",
      width: "75%",
      data: editData,
      disableClose: true,
    }));
  };
  openModalXL = (component: any, editData: any) => {
    return (this.matDialogRef = this.matDialog.open(component, {
      height: "auto",
      width: "100%",
      data: editData,
      disableClose: true,
    }));
  };
  closeStatusModal = () => {
    this.statusMatDialogRef.close(true);
  };

  openModalRight=(component: any, editData: any)=>{
    return (this.matDialogRef = this.matDialog.open(component, {
      height: "100%",
      width: "40%",
      data: editData,
      disableClose: true,
      position:{right:'0'}
    }));
  }
}
