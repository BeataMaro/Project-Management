import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from 'src/app/boards-listing/service/boards.service';

import { Iboard } from 'src/app/shared/models/board.model';
import { Itask } from 'src/app/shared/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from 'src/app/core/components/form-dialog/form-dialog.component';
import { ConfirmationDialog } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { getColumns, addColumn } from '../../store/column/column-actions';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import * as fromReducer from '../../store/column/column-reducers';
import { TaskService } from '../../service/task.service';
import { ColumnsService } from '../../service/columns.service';
import { ColumnsSelector } from '../../store/column/column-selector';
import { IColumn } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  boards$: Iboard[] = [];
  columns$: IColumn[] = [];
  username = '';
  // allColumns$: Observable<ColumnsStateInterface>;
  // boardId = Observable<string | undefined>;
  currentBoardId = '';

  constructor(
    private taskService: TaskService,
    private boardsService: BoardsService,
    private ColumnsService: ColumnsService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromReducer.ColumnsStateInterface>
  ) {
    this.currentBoardId = this.route.snapshot.params['id'];
    localStorage.setItem('boardId', this.currentBoardId);
  }

  @Input() boardItem: Iboard | null = null; refreshBoard: Iboard = {owner: '', users: []}

  ngOnInit(): void {
    this.getBoards();
    this.currentBoardId = this.route.snapshot.params['id'];
  }

  // ngOnChanges(): void {
  //   this.getBoards();
  // }

  createColumnForm() {
    const dialogRef = this.dialog.open(FormDialog, {
      data: {
        message: 'Add new column',
        cancelButtonText: 'Cancel',
        boardId: this.currentBoardId,
      },
    });
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.addColumn();
      }
    });
  }

  addColumn() {
    // this.ColumnsService.createColumn(
    //   this.createForm.value.title!,
    //   this.createForm.value.order!,
    //   this.boardId
    // ).subscribe((res) => {
    //   this.store.dispatch(addColumn(res));
    //   this.onConfirmClick();
    // });
  }

  onAddTask(item: Itask) {
    this.taskService.addTask(item).subscribe(
      (newItem: Itask) => {
        this.getAllColumns();
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
      .subscribe((boards) => (this.boards$ = boards));
  }

  getAllColumns() {
    //przenies do serwisu
    this.boardsService
      .getAllColumns(this.currentBoardId)
      .subscribe((res) => res.map((column) => console.log(`Column: ${column.title}, ${column.order}, ${column._id}, ${column.boardId}`)));

    this.store.dispatch(getColumns());
    this.store.select(ColumnsSelector);
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
        message: 'Do you want to delete this task?',
        cancelButtonText: 'Cancel',
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
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
