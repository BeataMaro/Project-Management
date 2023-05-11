import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Itask } from '../../../shared/models/task.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnChanges {
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
