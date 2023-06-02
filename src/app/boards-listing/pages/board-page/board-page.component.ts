import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from 'src/app/boards-listing/service/boards.service';

import { Iboard } from 'src/app/shared/models/board.model';
import { Itask } from 'src/app/shared/models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from 'src/app/core/components/form-dialog/form-dialog.component';
import { ConfirmationDialog } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import {
  getColumns,
  deleteColumn,
} from '../../store/column/column.actions';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TaskService } from '../../service/task.service';
import { ColumnsService } from '../../service/columns.service';
import { ColumnsSelector } from '../../store/column/column.selector';
import { ICol, IColumn } from 'src/app/shared/models/column.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsStateInterface } from '../../store/board/board.reducer';
import { addColumn } from '../../store/board/board.actions';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  boards$: Iboard[] = [];
  // columns$: IColumn[] = [];
  // columns$: Observable<(IColumn[] | ICol[] | undefined)[]>;
  columns: IColumn[] | ICol[] = [{ title: '', order: 0 }];
  username = '';
  // allColumns$: Observable<ColumnsStateInterface>;
  // boardId = Observable<string | undefined>;
  currentBoardId = '';
  tasks$: Itask[] = [];

  createColumnFields = new FormGroup({
    title: new FormControl('', [Validators.required]),
    order: new FormControl(0, [Validators.required]),
  });
  // column$: IColumn;

  constructor(
    private taskService: TaskService,
    private boardsService: BoardsService,
    private columnsService: ColumnsService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<BoardsStateInterface>
  ) {
    this.currentBoardId = this.route.snapshot.params['id'];
    localStorage.setItem('boardId', this.currentBoardId);
    // this.columns$ = this.store.select(ColumnsSelector);
  }

  @Input() boardItem: Iboard | null = null;
  refreshBoard: Iboard = { owner: '', users: [] };

  openedForm = false;

  ngOnInit(): void {
    this.getBoards();
    this.currentBoardId = this.route.snapshot.params['id'];
  }

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
    this.columnsService.createColumn(
      this.createColumnFields.value.title!,
      this.createColumnFields.value.order!,
      this.currentBoardId
    ).subscribe((res) => {
      this.columns = [...this.columns, res];
      console.log(res);
      // {
      //   title: res.title,
      //   order: res.order,
      //   _id: res._id,
      //   boardId: res.boardId,
      // },

      this.store.dispatch(
        // addColumn({
        //   columns: { title: res.title, order: res.order },
        //   boardId: res.boardId,
        // })
        addColumn({
          column: { title: res.title, order: res.order },
          boardId: res.boardId,
        })
      );
    });
    this.onConfirmClick();
    () => this.createColumnFields.setValue({ title: '', order: 0 });
  }

  onConfirmClick(): void {
    this.store.dispatch(getColumns());
  }

  onToggleComplete(changedItem: Itask): void {
    this.taskService
      .toggleComplete(changedItem)
      .subscribe((res) => console.log(res));
  }
  private getBoards() {
    this.boardsService
      .getAllBoards()
      .subscribe((boards) => (this.boards$ = boards));
  }

  getAllColumns() {
    this.boardsService
      .getAllColumns(this.currentBoardId)
      .subscribe((res) =>
        res.map((column) =>
          console.log(
            `Column: ${column.title}, ${column.order}, ${column._id}, ${column.boardId}`
          )
        )
      );

    this.store.dispatch(getColumns());
    this.store.select(ColumnsSelector);
  }

  toggleForm() {
    this.openedForm = !this.openedForm;
  }

  onAddTask(item: Itask) {
    this.taskService.addTask(item).subscribe(
      (newItem: Itask) => {
        // this.getAllColumns();
        console.log(newItem);
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  // deleteTask(taskId: string, boardId: string, columnId: string) {
  deleteTask() {
    console.log('deleting Task');
    // this.store.dispatch(TaskActions.deleteTask(column));
    // this.allColumns$ = this.store.select(ColumnsSelector);
  }

  deleteColumn(board: { boardId: string; columnId: string }) {
    this.store.dispatch(deleteColumn(board));
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
}
