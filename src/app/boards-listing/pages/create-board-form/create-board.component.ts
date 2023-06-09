import { Component } from '@angular/core';
import { BoardsService } from '../../service/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BoardsStateInterface } from 'src/app/store/board/board.reducer';
import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { Iboard } from 'src/app/shared/models/board.model';
import { Store } from '@ngrx/store';
import { getBoards, addBoard } from 'src/app/store/board/board.actions';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  createBoardForm = new FormGroup({
    title: new FormControl(' ', [Validators.required]),
  });
  board$: Iboard;
  // column$: ICol;

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<BoardsStateInterface>
  ) {
    this.board$ = { _id: '', title: '', owner: '', users: [] };
    // this.column$ = { title: '', order: 0}
  }

  ngOnInit() {
    this.store.dispatch(getBoards());
    // this.store.dispatch(ColumnsActions.getColumns());
  }

  // onCreateNewBoard(service, serviceMethod, formValues) {
  onCreateNewBoard() {
    // service.serviceMethod(formValues)
    this.boardsService
      .createBoard({
        title: this.createBoardForm.value.title,
        owner: localStorage.getItem('user_id')! || ' ',
        users: [],
      })
      .subscribe(
        (res) => {
          localStorage.setItem('board_id', res._id!);
          this.board$ = res;
        },

        () => this.router.navigateByUrl('/boards'),
        () => this.createBoardForm.setValue({ title: ' ' })
      );
    this.store.dispatch(addBoard({ board: this.board$ }));
    this.ngOnInit();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      panelClass: 'my-outlined-dialog',
      data: {
        question: this.createBoardForm.valid ? 'Success!' : '',
        message: this.createBoardForm.valid
          ? 'Your board has been created!'
          : 'Please, fill in your plan title.',
        confirmButtonText: 'ok',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.createBoardForm.valid) {
        this.router.navigateByUrl('/boards');
        this.onCreateNewBoard();
      }
    });
  }
}
