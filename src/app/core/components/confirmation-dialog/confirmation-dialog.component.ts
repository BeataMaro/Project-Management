import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getBoards } from 'src/app/boards-listing/store/board/board.actions';

interface dialogData {
  question: string | boolean;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string | boolean;
  buttonId: string;
}

@Component({ templateUrl: 'confirmation-dialog.component.html' })
export class ConfirmationDialog {
  question: string | boolean = false;
  message = 'Are you sure want to delete?';
  confirmButtonText = 'Yes';
  cancelButtonText: string | boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: dialogData,
    private dialogRef: MatDialogRef<ConfirmationDialog>,
    private store: Store
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.question = data.question || this.question;
      this.confirmButtonText = data.confirmButtonText || this.confirmButtonText;
      this.cancelButtonText = data.cancelButtonText || this.cancelButtonText;
      //   if (data.buttonText) {
      //     this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      //     this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      //   }
    }
  }

  onConfirmClick(): void {
    this.store.dispatch(getBoards());
    this.dialogRef.close(true);
  }
}
