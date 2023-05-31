import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Itask } from '../../../shared/models/task.model';
import { BoardsStateInterface } from '../../../store/reducers/board.reducers';

import { TasksSelector } from '../../../store/selectors/task.selectors';

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
