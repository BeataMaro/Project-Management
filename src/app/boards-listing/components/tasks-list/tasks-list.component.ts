import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Itask } from '../../../shared/models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnChanges, OnInit {
  @Output() toggleComplete = new EventEmitter();
  @Output() cdkDropListDropped = new EventEmitter();

  accomplishedTasks: Itask[] = [];
  toBeCompletedTasks: Itask[] = [];

  tasks: Itask[] = [
    // {
    //   title: 'go for a walk',
    //   order: 0,
    //   description: 'Do not forget about the dog',
    //   isCompleted: false,
    //   _id: '2333fff',
    //   boardId: JSON.stringify(localStorage.getItem('board_id')),
    //   columnId: '2222',
    //   userId: JSON.stringify(localStorage.getItem('user_id')),
    //   users: [],
    // },
    // {
    //   title: 'running',
    //   order: 1,
    //   description: 'Do not forget about the dog',
    //   isCompleted: true,
    //   _id: '2333bbbb',
    //   boardId: JSON.stringify(localStorage.getItem('board_id')),
    //   columnId: '333',
    //   userId: JSON.stringify(localStorage.getItem('user_id')),
    //   users: [],
    // },
  ];

  ngOnInit(): void {
    this.sortList();
    this.accomplishedTasks.map((task: Itask) => console.log(`Done: ${task.title}`))
    this.toBeCompletedTasks.map((task: Itask) => console.log(`Todo: ${task.title}`))
  }
  ngOnChanges(): void {
    this.sortList();
  }
  onToggleComplete() {
    this.sortList();
  }
  private sortList() {
    this.accomplishedTasks = this.tasks.filter(
      (task: Itask) => task.isCompleted
    );
    this.toBeCompletedTasks = this.tasks.filter(
      (task: Itask) => !task.isCompleted
    );
  }


  drop(event: CdkDragDrop<Itask[]>) {
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
