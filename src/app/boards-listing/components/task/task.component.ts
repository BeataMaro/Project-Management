import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Itask } from '../../../shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent  {
  @Input() taskItem: Itask | null = null;
  @Output() toggleCompleteTask = new EventEmitter();


  onToggleCompleteTask() {
    this.toggleCompleteTask.emit();
  }
}
