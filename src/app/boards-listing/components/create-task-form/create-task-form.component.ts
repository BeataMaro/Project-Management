import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Itask } from 'src/app/shared/models/task.model';
import { BoardsStateInterface } from 'src/app/store/board/board.reducer';

import { TasksSelector } from 'src/app/store/task/task.selectors';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
})
export class CreateTaskFormComponent {
  tasks$: Observable<Itask[]>;

  newTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<BoardsStateInterface>) {
    this.tasks$ = this.store.select(TasksSelector);
  }

  ngOnInit(): void {
    // this.tasks$ = this.store.dispatch(TasksActions.getTasks());
  }

  addNewTask() {}
}
