import { Component } from '@angular/core';
import { BoardsService } from '../../service/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  createBoardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    private boardsService: BoardsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  onCreateNewBoard() {
    this.boardsService
      .createBoard({
        title: this.createBoardForm.value.title,
        owner: localStorage.getItem('user_id')! || '',
        users: [],
      })
      .subscribe(
        (res) => localStorage.setItem(`board_${res._id}`, res._id!),
        (e) => this.router.navigateByUrl('/boards'),
        () => this.createBoardForm.setValue({ title: '' })
      );
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        question: 'Success!',
        message: 'Your board has been created!',
        confirmButtonText: 'ok',
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(() => this.router.navigateByUrl('/boards'));
  }
}
