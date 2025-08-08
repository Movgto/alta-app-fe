import { Component, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface AlertDialogData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

@Component({
  selector: 'app-alert.dialog',
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './alert.dialog.html',
  styleUrl: './alert.dialog.scss'
})
export class AlertDialog {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<AlertDialog>
  ) {}

  onCancel(): void {
    this._dialogRef.close('cancel');
  }

  onConfirm(): void {
    this._dialogRef.close('confirm');
  }
}
