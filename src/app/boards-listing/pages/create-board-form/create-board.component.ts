import { Component } from '@angular/core';
import { BoardsService } from '../../service/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducer from '../../store/board/board-reducers';
import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { Iboard } from 'src/app/shared/models/board.model';
import { Store } from '@ngrx/store';
import * as BoardsActions from '../../store/board/board-actions';

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

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<fromReducer.BoardsStateInterface>
  ) {
    this.board$ = { _id: '', title: '', owner: '', users: [] };
  }

  ngOnInit() {
    console.log('this', this);
    this.store.dispatch(BoardsActions.getBoards());
  }

  async onCreateNewBoard() {
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
          console.log(this.board$);
        },
        (e) => this.router.navigateByUrl('/boards'),
        () => this.createBoardForm.setValue({ title: '' })
      );
    const newBoard = await this.store.dispatch(
      BoardsActions.addBoard({ board: this.board$ })
    );
    const updateBoards = await this.store.dispatch(BoardsActions.getBoards());
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
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
