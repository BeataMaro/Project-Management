import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Itask } from '../../../shared/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnChanges, OnInit {
  @Input() tasksList: Itask[] = [];
  @Output() toggleComplete = new EventEmitter();

  accomplishedTasks: Itask[] = [];
  toBeCompletedTasks: Itask[] = [];

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.sortList();
  }
  onToggleComplete(task: Itask) {
    this.toggleComplete.emit(task);
    this.sortList();
  }
  private sortList() {
    this.accomplishedTasks = this.tasksList.filter(
      (task: Itask) => task.isCompleted
    );
    this.toBeCompletedTasks = this.tasksList.filter(
      (task: Itask) => !task.isCompleted
    );
    console.log(`Accomplished tasks: ${this.accomplishedTasks}`);
    console.log(`To be completed: ${this.toBeCompletedTasks}`);
  }
}
