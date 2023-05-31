import { Component } from '@angular/core';
import { BoardsService } from '../../service/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducer from '../../../store/reducers/board.reducers';
import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { Iboard } from 'src/app/shared/models/board.model';
import { Store } from '@ngrx/store';
import * as BoardsActions from '../../../store/actions/board.actions';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  createBoardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });
  board$: Iboard;
  // column$: ICol;

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<fromReducer.BoardsStateInterface>
  ) {
    this.board$ = { _id: '', title: '', owner: '', users: [] };
    // this.column$ = { title: '', order: 0}
  }

  ngOnInit() {
    this.store.dispatch(BoardsActions.getBoards());
    // this.store.dispatch(ColumnsActions.getColumns());
  }

  // onCreateNewBoard(service, serviceMethod, formValues) {
  onCreateNewBoard() {

// service.serviceMethod(formValues)

    //move to effects
    this.boardsService
      .createBoard({
        title: this.createBoardForm.value.title,
        owner: localStorage.getItem('user_id')! || '',
        users: [],
      })
      .subscribe(
        (res) => {
          localStorage.setItem('board_id', res._id!);
          this.board$ = res;
        },
        //
        () => this.router.navigateByUrl('/boards'),
        () => this.createBoardForm.setValue({ title: '' })
      );
    this.store.dispatch(BoardsActions.addBoard({ board: this.board$ }));
    this.ngOnInit();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      panelClass: 'my-outlined-dialog',
      data: {
        question: 'Success!',
        message: 'Your board has been created!',
        confirmButtonText: 'ok',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onCreateNewBoard();
      this.router.navigateByUrl('/boards');
    });
  }
}
