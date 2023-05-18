import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { ColumnsService } from 'src/app/boards-listing/service/columns.service';
import * as fromReducer from '../../../../app/boards-listing/store/column/column-reducers';
import { addColumn } from 'src/app/boards-listing/store/column/column-actions';
import { ICol, IColumn } from 'src/app/shared/models/column.model';

interface dialogData {
  question: string | boolean;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string | boolean;
  boardId: string;
}

@Component({ templateUrl: 'form-dialog.component.html' })
export class FormDialog {
  createForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    order: new FormControl(1),
  });

  message = 'New Column';
  confirmButtonText = 'Ok';
  cancelButtonText: string | boolean = 'Cancel';
  boardId = '';
  newColumn = { title: null, order: null };
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: dialogData,
    private dialogRef: MatDialogRef<FormDialog>,
    private ColumnsService: ColumnsService,
    private store: Store<fromReducer.ColumnsStateInterface>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.confirmButtonText = data.confirmButtonText || this.confirmButtonText;
      this.cancelButtonText = data.cancelButtonText || this.cancelButtonText;
      this.boardId = data.boardId || this.boardId;
    }
    // this.newColumn = this.createForm.value
  }
  create(): void {
    this.ColumnsService.createColumn(
      this.createForm.value.title!,
      this.createForm.value.order!,
      this.boardId
    ).subscribe((res) => {
      console.log(this.boardId);
      this.store.dispatch(addColumn(res));
      this.onConfirmClick();
    });
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
