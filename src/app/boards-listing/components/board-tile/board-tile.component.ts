import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { Iboard } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent {
  isEdit = false;

  constructor(private dialog: MatDialog) {}

  @Input() board: Iboard = { title: '', users: [], owner: '' };
  @Output() removeBoard: EventEmitter<string> = new EventEmitter<string>();

  editBoard(boardId: string) {
    this.isEdit = true;
  }

  deleteBoard(board: { boardId: string }) {
    this.removeBoard.emit(board.boardId);
  }

  openDialog(board: { boardId: string }) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Do you want to delete the board and the associated tasks?',
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteBoard(board);
      }
    });
  }
}
