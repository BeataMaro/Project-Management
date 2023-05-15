import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ColumnsService } from 'src/app/boards-listing/service/columns.service';
import * as fromReducer from '../../../../app/boards-listing/store/column/column-reducers';
import { addColumn } from 'src/app/boards-listing/store/column/column-actions';


interface dialogData {
  question: string | boolean;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string | boolean;
}

@Component({ templateUrl: 'form-dialog.component.html' })
export class FormDialog {
  createForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    order: new FormControl(1),
  });

  message = 'New Column';
  confirmButtonText = 'Ok';
  cancelButtonText: string | boolean = 'Cancel';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: dialogData,
    private dialogRef: MatDialogRef<FormDialog>,
    private ColumnsService: ColumnsService,
    private store: Store<fromReducer.ColumnsStateInterface>,

  ) {
    if (data) {
      this.message = data.message || this.message;
      this.confirmButtonText = data.confirmButtonText || this.confirmButtonText;
      this.cancelButtonText = data.cancelButtonText || this.cancelButtonText;
    }
  }

  create(): void {
    console.log(this.createForm.value.title);
    this.ColumnsService.createColumn(
      this.createForm.value.title!,
      this.createForm.value.order!,
    ).subscribe((res) => this.store.dispatch(addColumn(res)));
    this.onConfirmClick();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
