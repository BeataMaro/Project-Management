import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { Iboard } from 'src/app/shared/models/board.model';
import { deleteBoard, getBoards } from '../../store/board/board-actions';
import { BoardsService } from '../../service/boards.service';
import { shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
})
export class BoardTileComponent implements OnInit {
  // isLoggedIn: false;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private BoardsService: BoardsService
  ) {}

  @Input() board: Iboard = { owner: '', users: [] };

  ngOnInit(): void {
    // if (!this.isLoggedIn) this.router.navigateByUrl('/home');
    this.BoardsService.getAllBoards().pipe(shareReplay()).subscribe();
    this.store.dispatch(getBoards());
  }

  deleteBoard(board: { boardId: string }) {
    this.store.dispatch(deleteBoard(board));
    this.BoardsService.deleteBoard(board.boardId).subscribe();
    this.ngOnInit();
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
