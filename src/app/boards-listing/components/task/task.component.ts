import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Itask } from '../../../shared/models/task.model';

import { TaskService } from '../../service/task.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: Itask | null = null;
  @Output() toggleCompleteTask = new EventEmitter();

  constructor(private taskService: TaskService, private store: Store) {}

  onToggleCompleteTask(task: Itask) {
    this.toggleCompleteTask.emit(task);
    console.log(task);
    this.taskService.toggleComplete(task).subscribe((res: Itask) => {
      console.log(res);
      this.toggleCompleteTask.emit(res);
    });
  }
}
