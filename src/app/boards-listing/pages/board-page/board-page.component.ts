import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from 'src/app/boards-listing/service/boards.service';

import { Iboard } from 'src/app/shared/models/board.model';
import { Itask } from 'src/app/shared/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import * as fromReducer from '../../store/column/column-reducers';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent {
  boards: Iboard[] = [];
  username = '';
  // allColumns$: Observable<ColumnsStateInterface>;
  // boardId = Observable<string | undefined>;
  currrentBoardId = '';

  constructor(
    private taskService: TaskService,
    private boardsService: BoardsService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromReducer.ColumnsStateInterface>
  ) {
    this.route.params.subscribe(({id}) => this.currrentBoardId = id);
    localStorage.setItem('boardId', this.currrentBoardId);
  }

  @Input() boardItem: Iboard | null = null;


  onAddTask(item: Itask) {
    this.taskService.addTask(item).subscribe(
      (newItem: Itask) => {
        this.getBoards();
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }
  onToggleComplete(changedItem: Itask): void {
    this.taskService
      .toggleComplete(changedItem)
      .subscribe((res) => console.log(res));
  }
  private getBoards() {
    this.boardsService
      .getBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  // deleteTask(taskId: string, boardId: string, columnId: string) {
  deleteTask() {
    console.log('deleting Task');
    // this.store.dispatch(TaskActions.deleteTask(column));
    // this.allColumns$ = this.store.select(ColumnsSelector);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message:
          'Do you want to delete the board and all the associated tasks?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTask();
      }
    });
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
