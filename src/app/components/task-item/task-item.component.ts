import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Task } from '../../Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes: IconDefinition = faTimes;

  constructor() {}

  deleteTaskItem() {
    this.deleteTask.emit(this.task);
  }

  toggleReminder() {
    this.onToggleReminder.emit(this.task);
    // this.task.reminder = !this.task.reminder;
  }

  ngOnInit(): void {}
}
